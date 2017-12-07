// ==UserScript==
// @name         Bankier - auto-login
// @namespace    https://github.com/maxwroc/UserScripts
// @version      0.1
// @description  Skrypt do automatycznego logowania sie na stonach bankier.pl
// @author       maxwroc
// @match        https://www.bankier.pl/konto/logowanie*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    let login = GM_getValue("bankier_user");
    let pass = GM_getValue("bankier_pass");

    let formElem = document.getElementById("loginForm");
    let submitElem = document.getElementById("loginSubmit");
    let loginElem = document.getElementById("login_email");
    let passElem = document.getElementById("password");

    if(!formElem || !submitElem || !loginElem || !passElem) {
        console.warn("[BankierAutoLogin] Failed to get form fields");
        return;
    }

    if(!login) {
        console.log("[BankierAutoLogin] Waiting for the first login");
        // wait for the first login to save data
        formElem.addEventListener("submit", () => {
            GM_setValue("bankier_user", loginElem.value);
            GM_setValue("bankier_pass", passElem.value);
        }, true);
    }
    else {
        console.log("[BankierAutoLogin] Auto-login");
        loginElem.value = login;
        passElem.value = pass;

        var evObj = document.createEvent('MouseEvents');
        evObj.initEvent("click", true, false);
        submitElem.dispatchEvent(evObj);
    }
})();