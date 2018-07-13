// ==UserScript==
// @name         Wykop.pl - hide sponsored articles
// @namespace    https://github.com/maxwroc/UserScripts
// @version      0.2
// @description  Skrypt do ukrywania sponsorowanych artykulow
// @author       maxwroc
// @match        https://www.wykop.pl/*
// ==/UserScript==

(function() {
  $(".article .diggbox a[title='dodaj jako znalezisko']").closest("li").attr("style", "display: none");
})();
