// ==UserScript==
// @name         Ambasada
// @namespace    https://github.com/maxwroc/UserScripts
// @version      0.2
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
    let ge = id => document.getElementById(id);
    let findChildElem = (where, what) => Array.from(document.querySelectorAll(where)).find(el => el.textContent.toUpperCase() == what.toUpperCase());

    let handler = mapping[location.pathname];
    handler && handler();


    function trigger(elem, name) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(name, false, true);
        elem.dispatchEvent(evt);
    }

    function step1() {

        var elemKraj = findChildElem("#tresc_upKraj select > option", "WIELKA BRYTANIA");
        if (!elemKraj) {
            console.log(elemKraj);
            alert("kraj nie odnaleziony");
            return;
        }

        let elemTargetKraj = qs("#tresc_upKraj select");

        if (elemTargetKraj.value == elemKraj.value) {
            var elemPlacowka = findChildElem("#tresc_upPlacowka select > option", "Londyn (wszystkie rodzaje paszportów; sprawy prawne; sprawy wizowe)");
            if (!elemPlacowka) {
                console.log(elemPlacowka);
                alert("placowka nie znaleziona");
                return;
            }

            let elemTargetPlac = qs("#tresc_upPlacowka select");
            elemTargetPlac.value = elemPlacowka.value;
            trigger(elemTargetPlac, "change");
        }
        else {
            let startBtn = document.createElement("button");
            startBtn.textContent = "Start auto-click"
            startBtn.addEventListener("click", () => {
                elemTargetKraj.value = elemKraj.value;
                // trigger(elemTargetKraj, "change");
            });

            let container = ge("tresc_panelIndywidualny");
            container.append(startBtn);
        }
    }

    function step2() {
        let elem = Array.from(document.querySelectorAll(".PODPOZYCJA_MENU")).filter(r => r.textContent.indexOf("paszportowe") != -1)[0];
        elem.click();
    }

    function step3() {
        let lokalizacjaElem = findChildElem("#cp_cbLokalizacja > option", "Londyn");
        let lokalizacjaTarget = qs("#cp_cbLokalizacja");
        let infoElem = qs("#cp_lblInformacje");

        if (!lokalizacjaElem || !lokalizacjaTarget || !infoElem) {
            console.log("lokalizacjaElem", lokalizacjaElem);
            console.log("lokalizacjaTarget", lokalizacjaTarget);
            console.log("infoElem", infoElem);
            alert("lokalizacja nie odnaleziona");
            return;
        }

        infoElem.parentElement.style.display = "none";

        if(lokalizacjaTarget.value != lokalizacjaElem.value) {
            lokalizacjaTarget.value = lokalizacjaElem.value;
            //trigger(elem, "change");

            setTimeout(() => {
                let elem = qs("#cp_lblRezerwacjaTerminu").nextElementSibling;
                console.log(elem);

                console.log(elem.value)

                if(elem.value == 1) {
                    //let text = qs("#cp_lblInformacje").parentElement;
                    //text.style.display = "none";
                    return;
                }

                elem.value = 1;
                trigger(elem, "change");

            }, 500);
        }
        else {
        }
    }

})();
