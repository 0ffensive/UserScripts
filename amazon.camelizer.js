// ==UserScript==
// @name           AmazonCamelizer: CamelCamelCamel Graphs
// @version        0.2
// @description    Adds CamelCamelCamel graph to all Amazon product pages.
// @author         maxwroc
// @namespace      https://github.com/maxwroc/UserScripts
// @include        /^https?://www\.amazon\.(com|co\.uk|ca|de|fr|es|it|cn|co\.jp)/*/
// @noframes
// ==/UserScript==

(() => {
    class AmazonCamelizer {
        constructor() {
            let element = document.querySelector('input[id="ASIN"]');
            this.asin = element.value.replace(/\s/g, "");

            this.country = location.hostname.split(".").pop();
            if (this.country == "com") {
                this.country = "us";
            }

            if (!this.country || !this.asin) {
                throw `Failed to get country or asin values`;
            }
        }

        getCamelUrl() {
            return `http://${this.country}.camelcamelcamel.com/product/${this.asin}`;
        }

        getCamelImageUrl(width, height) {
            return `http://charts.camelcamelcamel.com/${this.country}/${this.asin}/amazon-new.png?force=1&zero=0&w=${width}&h=${height}&desired=false&legend=1&ilt=1&tp=all&fo=0`;
        }

        insertGraphBefore(elemSelector, width = 500, height = 250) {
            let elem = document.querySelector(elemSelector);
            if (!elem) {
                throw "Element not found: " + elemSelector;
            }

            let container = document.createElement("div");
            container.innerHTML = `<hr /><a href="${this.getCamelUrl()}" target="_blank"><img src="${this.getCamelImageUrl(width, height)}" style="margin-bottom: 15px" /></a><hr />`;
            elem.parentElement.insertBefore(container, elem);
        }
    }

    try {
        let a = new AmazonCamelizer();
        a.insertGraphBefore("#price_feature_div+*");
    }
    catch (e) {
        console.warn("[AmazonCamelizer]: " + e.message);
    }
})();