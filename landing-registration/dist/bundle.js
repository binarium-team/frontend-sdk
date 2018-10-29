!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t,r){"use strict";var n=r(2),o=r(10),i=Object.prototype.toString;function a(e){return"[object Array]"===i.call(e)}function s(e){return null!==e&&"object"==typeof e}function u(e){return"[object Function]"===i.call(e)}function c(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),a(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]=r}for(var n=0,o=arguments.length;n<o;n++)c(arguments[n],r);return t},extend:function(e,t,r){return c(t,function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,r){"use strict";(function(t){var n=r(0),o=r(13),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=r(3):void 0!==t&&(e=r(3)),e}(),transformRequest:[function(e,t){return o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],function(e){s.headers[e]={}}),n.forEach(["post","put","patch"],function(e){s.headers[e]=n.merge(i)}),e.exports=s}).call(this,r(12))},function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},function(e,t,r){"use strict";var n=r(0),o=r(14),i=r(16),a=r(17),s=r(18),u=r(4),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||r(19);e.exports=function(e){return new Promise(function(t,f){var l=e.data,d=e.headers;n.isFormData(l)&&delete d["Content-Type"];var p=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(e.url)||(p=new window.XDomainRequest,h="onload",m=!0,p.onprogress=function(){},p.ontimeout=function(){}),e.auth){var y=e.auth.username||"",w=e.auth.password||"";d.Authorization="Basic "+c(y+":"+w)}if(p.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p[h]=function(){if(p&&(4===p.readyState||m)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?a(p.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:r,config:e,request:p};o(t,f,n),p=null}},p.onerror=function(){f(u("Network Error",e,null,p)),p=null},p.ontimeout=function(){f(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",p)),p=null},n.isStandardBrowserEnv()){var v=r(20),g=(e.withCredentials||s(e.url))&&e.xsrfCookieName?v.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in p&&n.forEach(d,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)}),e.withCredentials&&(p.withCredentials=!0),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){p&&(p.abort(),f(e),p=null)}),void 0===l&&(l=null),p.send(l)})}},function(e,t,r){"use strict";var n=r(15);e.exports=function(e,t,r,o,i){var a=new Error(e);return n(a,t,r,o,i)}},function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,r){"use strict";var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=function(e){return e&&e.__esModule?e:{default:e}}(r(8));function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a="https://api.binarium.com",s=function(){function e(t,r,n){i(this,e);var o=this.getParamsByName("partner_id"),a=this.getParamsByName("subid");this.email=t,this.password=r,this.currency=n,this.token=null,this.refCode=o&&a?o+"&subid="+a:o}return n(e,[{key:"save",value:function(){var e=this;return new Promise(function(t,r){e.createUser().then(function(n){e.token=n.data.token,o.default.all([e.createProfile(),e.createWallet(),e.markUser()]).then(function(r){return t(e)}).catch(function(e){r(e)})}).catch(function(e){console.log(e),r(e.response.data.errors)})})}},{key:"login",value:function(){var e=this;return new Promise(function(t,r){e.loginUser().then(function(r){e.token=r.data.token,t(e)}).catch(function(e){console.log(e),r(e.response.data.errors)})})}},{key:"loginUser",value:function(){var e=new FormData;return e.set("email",this.email),e.set("password",this.password),e.set("type","jwt"),(0,o.default)({method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},url:a+"/api/v1/login",data:e})}},{key:"createUser",value:function(){var e=new FormData;return e.set("user[email]",this.email),e.set("user[password]",this.password),e.set("user[refCode]",this.refCode),e.set("user[confirmationRequest][confirmationUrl]","https://binarium.com/main/confirm-registration"),(0,o.default)({method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},url:a+"/api/v1/users",data:e})}},{key:"createWallet",value:function(){var e=new FormData;return e.set("wallet[currency]",parseInt(this.currency)),(0,o.default)({method:"POST",headers:{"content-type":"application/x-www-form-urlencoded","X-JWT":this.token},url:a+"/api/v1/users/self/wallets",data:e})}},{key:"createProfile",value:function(){var e=new FormData;return e.set("profile[timezone]",(new Date).getTimezoneOffset()),e.set("profile[language]",this.getBrowserLanguage()),(0,o.default)({method:"POST",headers:{"content-type":"application/x-www-form-urlencoded","X-JWT":this.token},url:a+"/api/v1/profiles/self",data:e})}},{key:"markUser",value:function(){var e=new FormData;return e.set("record[alias]","newUser"),e.set("record[value]",!0),(0,o.default)({method:"POST",headers:{"content-type":"application/x-www-form-urlencoded","X-JWT":this.token},url:"https://storage.binarium.com/api/v1/records",data:e})}},{key:"getBrowserLanguage",value:function(){var e=window.navigator.userLanguage||window.navigator.language;return e=e.substring(0,2),e=["uk","kk","be"].includes(e)?"ru":e,["en","ru","tr","de"].includes(e)?e:"en"}},{key:"getParamsByName",value:function(e){var t=window.location.href;e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}}]),e}(),u=function(){function e(){i(this,e),this.email="",this.password="",this.currency=null,this.agree=!1}return n(e,[{key:"isExistEmail",value:function(){return!!this.email.length}},{key:"isExistPassword",value:function(){return!!this.password.length}},{key:"isPasswordLength",value:function(){return this.password.length>=8}},{key:"isValidEmailFormat",value:function(){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(this.email).toLowerCase())}},{key:"isAgree",value:function(){return this.agree}},{key:"isValid",value:function(){return this.isExistEmail()&&this.isExistPassword()&&this.isPasswordLength()&&this.isValidEmailFormat()&&this.isAgree()}},{key:"isValidLogin",value:function(){return this.isExistEmail()&&this.isExistPassword()&&this.isPasswordLength()&&this.isValidEmailFormat()}}]),e}();document.querySelectorAll("[data-landing-registration-form]").forEach(function(e){var t=e.querySelector('[name="email"]'),r=e.querySelector('[name="password"]'),n=e.querySelector('[name="currency"][checked]'),o=e.querySelector('[name="agree"]'),i=e.querySelector("[data-errors-email-required]"),a=e.querySelector("[data-errors-email-format]"),c=e.querySelector("[data-errors-password-required]"),f=e.querySelector("[data-errors-password-minlength]"),l=e.querySelector("[data-errors-agree]"),d=e.querySelector("[data-errors-server-email-format]"),p=e.querySelector("[data-errors-server-email-exist]"),h=new u;function m(){d.style.display="none",p.style.display="none"}function y(){i.style.display=h.isExistEmail()?"none":"block",a.style.display=h.isValidEmailFormat()?"none":"block",c.style.display=h.isExistPassword()?"none":"block",f.style.display=h.isPasswordLength()?"none":"block",l.style.display=h.isAgree()?"none":"block"}e.addEventListener("submit",function(e){if(e.preventDefault(),y(),h.isValid()){m();var t=new s(h.email,h.password,h.currency);t.save().then(function(){return window.parent.location.href="https://binarium.com/?auth-token="+t.token}).catch(function(e){return e.forEach(function(e){return function(e){switch(e){case"bf447c1c-0266-4e10-9c6c-573df282e413":d.style.display="block";break;case"23bd9dbf-6b9b-41cd-a99e-4844bcf3077f":p.style.display="block"}}(e.code)})})}}),h.email=t.value,h.password=r.value,h.currency=n?n.value:null,h.agree=o.checked,t.addEventListener("keyup",function(e){h.email=e.target.value,y(),m()}),r.addEventListener("keyup",function(e){h.password=e.target.value,y(),m()}),e.querySelectorAll('[name="currency"]').forEach(function(e){e.addEventListener("change",function(e){h.currency=e.target.value})}),o.addEventListener("change",function(e){h.agree=e.target.checked,y()})}),document.querySelectorAll("[data-landing-login-form]").forEach(function(e){var t=e.querySelector('[name="email"]'),r=e.querySelector('[name="password"]'),n=e.querySelector("[data-errors-email-required]"),o=e.querySelector("[data-errors-email-format]"),i=e.querySelector("[data-errors-password-required]"),a=e.querySelector("[data-errors-password-minlength]"),c=e.querySelector("[data-errors-server-credentials]"),f=new u;function l(){c.style.display="none"}function d(){n.style.display=f.isExistEmail()?"none":"block",o.style.display=f.isValidEmailFormat()?"none":"block",i.style.display=f.isExistPassword()?"none":"block",a.style.display=f.isPasswordLength()?"none":"block"}e.addEventListener("submit",function(e){if(e.preventDefault(),f.isValidLogin()){l();var t=new s(f.email,f.password);t.login().then(function(){return window.location.href="https://binarium.com/?auth-token="+t.token}).catch(function(e){return e.forEach(function(e){return function(e){switch(e){case"4dba5f9c79ae34be5884e1a3c8c45e92":c.style.display="block"}}(e.code)})})}}),f.email=t.value,f.password=r.value,t.addEventListener("keyup",function(e){f.email=e.target.value,d(),l()}),r.addEventListener("keyup",function(e){f.password=e.target.value,d(),l()})})},function(e,t,r){e.exports=r(9)},function(e,t,r){"use strict";var n=r(0),o=r(2),i=r(11),a=r(1);function s(e){var t=new i(e),r=o(i.prototype.request,t);return n.extend(r,i.prototype,t),n.extend(r,t),r}var u=s(a);u.Axios=i,u.create=function(e){return s(n.merge(a,e))},u.Cancel=r(6),u.CancelToken=r(26),u.isCancel=r(5),u.all=function(e){return Promise.all(e)},u.spread=r(27),e.exports=u,e.exports.default=u},function(e,t){function r(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(r(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&r(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,r){"use strict";var n=r(1),o=r(0),i=r(21),a=r(22);function s(e){this.defaults=e,this.interceptors={request:new i,response:new i}}s.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(n,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[a,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},o.forEach(["delete","get","head","options"],function(e){s.prototype[e]=function(t,r){return this.request(o.merge(r||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){s.prototype[e]=function(t,r,n){return this.request(o.merge(n||{},{method:e,url:t,data:r}))}}),e.exports=s},function(e,t){var r,n,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(r===setTimeout)return setTimeout(e,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(e){r=i}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var u,c=[],f=!1,l=-1;function d(){f&&u&&(f=!1,u.length?c=u.concat(c):l=-1,c.length&&p())}function p(){if(!f){var e=s(d);f=!0;for(var t=c.length;t;){for(u=c,c=[];++l<t;)u&&u[l].run();l=-1,t=c.length}u=null,f=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new h(e,t)),1!==c.length||f||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){n.forEach(e,function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])})}},function(e,t,r){"use strict";var n=r(4);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},function(e,t,r){"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e}},function(e,t,r){"use strict";var n=r(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var i;if(r)i=r(t);else if(n.isURLSearchParams(t))i=t.toString();else{var a=[];n.forEach(t,function(e,t){null!==e&&void 0!==e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))}))}),i=a.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},function(e,t,r){"use strict";var n=r(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,i,a={};return e?(n.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=n.trim(e.substr(0,i)).toLowerCase(),r=n.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([r]):a[t]?a[t]+", "+r:r}}),a):a}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},function(e,t,r){"use strict";var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,r,i=String(e),a="",s=0,u=n;i.charAt(0|s)||(u="=",s%1);a+=u.charAt(63&t>>8-s%1*8)){if((r=i.charCodeAt(s+=.75))>255)throw new o;t=t<<8|r}return a}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,r){"use strict";var n=r(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},function(e,t,r){"use strict";var n=r(0),o=r(23),i=r(5),a=r(1),s=r(24),u=r(25);function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return c(e),e.baseURL&&!s(e.url)&&(e.url=u(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||a.adapter)(e).then(function(t){return c(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t,r){return n.forEach(r,function(r){e=r(e,t)}),e}},function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,r){"use strict";var n=r(6);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var r=this;e(function(e){r.reason||(r.reason=new n(e),t(r.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}]);