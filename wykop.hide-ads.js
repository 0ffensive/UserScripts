// ==UserScript==
// @name         Wykop.pl - hide sponsored articles
// @namespace    https://github.com/maxwroc/UserScripts
// @version      0.3
// @description  Skrypt do ukrywania sponsorowanych artykulow
// @author       maxwroc
// @match        https://www.wykop.pl/*
// ==/UserScript==

(function() {
  var s = document.createElement("style");
  s.type = "text/css";
  s.textContent = ".link.iC .article:not(.dC) { display: none; }";
  document.head.appendChild(s);
    
  $(".article .diggbox a[title='dodaj jako znalezisko']").closest("li").attr("style", "display: none");
})();
