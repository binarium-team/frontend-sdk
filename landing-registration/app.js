import axios from 'axios';

const REDIRECT_URL = 'https://binarium.com';
const BASE_URL = 'https://api.binarium.com';
const STORAGE_URL = 'https://storage.binarium.com/api/v1/records';
const CONFIRMATION_URL = 'https://binarium.com/main/confirm-registration';

class User {
    constructor(email, password, currency) {
        const ref = this.getParamsByName('partner_id');
        const subid = this.getParamsByName('subid');
        this.email = email;
        this.password = password;
        this.currency = currency;
        this.token = null;
        this.refCode = ref && subid ? ref + '&subid=' + subid : ref;
    }

    save() {
        return new Promise((resolve, reject) => {
            this.createUser()
                .then((response) => {
                    this.token = response.data.token;
                    axios.all([
                        this.createProfile(),
                        this.createWallet(),
                        this.markUser()
                    ])
                    .then(response => resolve(this))
                    .catch(errors => {reject(errors)})
                })
                .catch(error => {console.log(error); reject(error.response.data['errors'])})
        })
    }

    login() {
        return new Promise((resolve, reject) => {
            this.loginUser()
                .then((response) => {
                    this.token = response.data.token;
                    resolve(this);
                })
                .catch(error => {console.log(error); reject(error.response.data['errors'])})
        })
    }

    loginUser () {
        const u = new FormData();

        u.set('email', this.email);
        u.set('password', this.password);
        u.set('type', 'jwt');

        return axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            url: BASE_URL + '/api/v1/login',
            data: u
        });
    }

    createUser () {
        const u = new FormData();

        u.set('user[email]', this.email);
        u.set('user[password]', this.password);
        u.set('user[refCode]', this.refCode);
        u.set('user[confirmationRequest][confirmationUrl]', CONFIRMATION_URL);

        return axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            url: BASE_URL + '/api/v1/users',
            data: u
        });
    }

    createWallet () {
        let w = new FormData();
        w.set('wallet[currency]', parseInt(this.currency));

        return axios({
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-JWT': this.token
            },
            url: BASE_URL + '/api/v1/users/self/wallets',
            data: w
        })
    }

    createProfile () {
        let p = new FormData();
        p.set('profile[timezone]', new Date().getTimezoneOffset());
        p.set('profile[language]', this.getBrowserLanguage());

        return axios({
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-JWT': this.token
            },
            url: BASE_URL + '/api/v1/profiles/self',
            data: p
        })
    }

    markUser () {
        let r = new FormData();

        r.set('record[alias]', 'newUser');
        r.set('record[value]', true);

        return axios({
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-JWT': this.token
            },
            url: STORAGE_URL,
            data: r
        });
    }

    getBrowserLanguage () {
        let lang = window.navigator['userLanguage'] || window.navigator.language;
        lang = lang.substring(0,2);
        lang = ['uk', 'kk', 'be'].includes(lang) ? 'ru' : lang;
        return ['en', 'ru', 'tr', 'de'].includes(lang) ? lang : 'en';
    }

    getParamsByName (name) {
        const url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}

class Form {
    constructor() {
        this.email = '';
        this.password = '';
        this.currency = null;
        this.agree = false;
    }

    isExistEmail() {
        return !!this.email.length;
    }

    isExistPassword() {
        return !!this.password.length;
    }

    isPasswordLength() {
        return this.password.length >= 8;
    }

    isValidEmailFormat() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.email).toLowerCase());
    }

    isAgree() {
        return this.agree;
    }

    isValid() {
        return this.isExistEmail() && this.isExistPassword() 
            && this.isPasswordLength() && this.isValidEmailFormat() 
            && this.isAgree();
    }

    isValidLogin() {
        return this.isExistEmail() && this.isExistPassword()
            && this.isPasswordLength() && this.isValidEmailFormat();
    }
}

document.querySelectorAll('[data-landing-registration-form]').forEach(domForm => {
    const emailField = domForm.querySelector('[name="email"]');
    const passwordField = domForm.querySelector('[name="password"]');
    const currencyField = domForm.querySelector('[name="currency"][checked]');
    const agreeField = domForm.querySelector('[name="agree"]');

    const errEmailRequired = domForm.querySelector('[data-errors-email-required]');
    const errEmailFormat = domForm.querySelector('[data-errors-email-format]');
    const errPasswordRequired = domForm.querySelector('[data-errors-password-required]');
    const errPasswordMinLength = domForm.querySelector('[data-errors-password-minlength]');
    const errPasswordAgree = domForm.querySelector('[data-errors-agree]');
    const errServerEmailFormat = domForm.querySelector('[data-errors-server-email-format]');
    const errServerEmailExist = domForm.querySelector('[data-errors-server-email-exist]');

    const form = new Form();

    domForm.addEventListener('submit', (e) => {
        e.preventDefault();
        checkErrors();
        if (form.isValid()) {
            clearServerErrors();
            const user = new User(form.email, form.password, form.currency);
            user.save()
                .then(() => window.location.href = REDIRECT_URL + '/?auth-token=' + user.token)
                .catch(errors => errors.forEach(err => showServerError(err.code)));
        } 
    });

    form.email = emailField.value;
    form.password = passwordField.value;
    form.currency = currencyField ? currencyField.value : null;
    form.agree = agreeField.checked;

    emailField.addEventListener('keyup', (e) => {
        form.email = e.target.value;
        checkErrors();
        clearServerErrors();
    });

    passwordField.addEventListener('keyup', (e) => {
        form.password = e.target.value;
        checkErrors();
        clearServerErrors();
    });

    domForm.querySelectorAll('[name="currency"]').forEach((e) => {
        e.addEventListener('change', (event) => {
            form.currency = event.target.value;
        })
    });

    agreeField.addEventListener('change', (e) => {
        form.agree = e.target.checked;
        checkErrors();
    });

    function clearServerErrors() {
        errServerEmailFormat.style.display = 'none';
        errServerEmailExist.style.display = 'none';
    }

    function showServerError(code) {
        switch (code) {
            case 'bf447c1c-0266-4e10-9c6c-573df282e413':
                errServerEmailFormat.style.display = 'block';
                break;
            case '23bd9dbf-6b9b-41cd-a99e-4844bcf3077f':
                errServerEmailExist.style.display = 'block';
        }
    }

    function checkErrors() {
        errEmailRequired.style.display = form.isExistEmail() ?  'none' : 'block';
        errEmailFormat.style.display = form.isValidEmailFormat() ?  'none' : 'block';
        errPasswordRequired.style.display = form.isExistPassword() ?  'none' : 'block';
        errPasswordMinLength.style.display = form.isPasswordLength() ?  'none' : 'block';
        errPasswordAgree.style.display = form.isAgree() ?  'none' : 'block';
    }
});


document.querySelectorAll('[data-landing-login-form]').forEach(domForm => {
    const emailField = domForm.querySelector('[name="email"]');
    const passwordField = domForm.querySelector('[name="password"]');

    const errEmailRequired = domForm.querySelector('[data-errors-email-required]');
    const errEmailFormat = domForm.querySelector('[data-errors-email-format]');
    const errPasswordRequired = domForm.querySelector('[data-errors-password-required]');
    const errPasswordMinLength = domForm.querySelector('[data-errors-password-minlength]');

    const errServerCredentials = domForm.querySelector('[data-errors-server-credentials]');

    const form = new Form();

    domForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.isValidLogin()) {
            clearServerErrors();
            const user = new User(form.email, form.password);
            user.login()
                .then(() => window.location.href = REDIRECT_URL + '/?auth-token=' + user.token)
                .catch(errors => errors.forEach(err => showServerError(err.code)));
        }
    });

    form.email = emailField.value;
    form.password = passwordField.value;

    emailField.addEventListener('keyup', (e) => {
        form.email = e.target.value;
        checkErrors();
        clearServerErrors();
    });

    passwordField.addEventListener('keyup', (e) => {
        form.password = e.target.value;
        checkErrors();
        clearServerErrors();
    });

    function clearServerErrors() {
        errServerCredentials.style.display = 'none';
    }

    function checkErrors() {
        errEmailRequired.style.display = form.isExistEmail() ?  'none' : 'block';
        errEmailFormat.style.display = form.isValidEmailFormat() ?  'none' : 'block';
        errPasswordRequired.style.display = form.isExistPassword() ?  'none' : 'block';
        errPasswordMinLength.style.display = form.isPasswordLength() ?  'none' : 'block';
    }

    function showServerError(code) {
        switch (code) {
            case '4dba5f9c79ae34be5884e1a3c8c45e92':
                errServerCredentials.style.display = 'block';
                break;
        }
    }
});
