// ==UserScript==
// @name         Ambasada
// @namespace    https://github.com/maxwroc/UserScripts
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://secure.e-konsulat.gov.pl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const mapping = {
        "/Default.aspx" : step1,
        "/Informacyjne/Placowka.aspx" : step2,
        "/Wizyty/Paszportowe/RejestracjaTerminuWizytyPaszportowej.aspx" : step3
    };

    var qs = sel => document.querySelector(sel);

    let handler = mapping[location.pathname];
    handler && handler();


    function trigger(elem, name) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(name, false, true);
        elem.dispatchEvent(evt);
    }

    function step1() {
        let elem = qs("#tresc_upKraj > select");
        elem.value = 15;
        trigger(elem, "change");
        setTimeout(() => {
            elem = qs("#tresc_upPlacowka > select");
            elem.value = 105;
            trigger(elem, "change");
        }, 500);
    }

    function step2() {
        let elem = Array.from(document.querySelectorAll(".PODPOZYCJA_MENU")).filter(r => r.textContent.indexOf("paszportowe") != -1)[0];
        elem.click();
    }

    function step3() {
        let elem = qs("#cp_cbLokalizacja");

        if(elem.value != 145) {
            elem.value = 145;
            trigger(elem, "change");
        }
        else {
            setTimeout(() => {
                let elem = qs("#cp_lblRezerwacjaTerminu").nextElementSibling;

                if(elem.value == 1) {
                    let text = qs("#cp_lblInformacje").parentElement;
                    text.style.display = "none";
                    return;
                }

                elem.value = 1;
                trigger(elem, "change");

            }, 500);
        }
    }

})();