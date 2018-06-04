// ==UserScript==
// @name         Wykop.pl - hide sponsored articles
// @namespace    https://github.com/maxwroc/UserScripts
// @version      0.1
// @description  Skrypt do ukrywania sponsorowanych artykulow
// @author       maxwroc
// @match        https://www.wykop.pl/*
// ==/UserScript==

(function() {
  var s = document.createElement("style");
  s.type = "text/css";
  s.textContent = ".link.iC .article:not(.dC) { display: none; }";
  document.head.appendChild(s);
})();
