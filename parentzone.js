// ==UserScript==
// @name ParentZone
// @description Description - lorem impsum
// @homepageURL http://chodorow.ski
// @author Maks
// @version 0.1
// @date 05-12-2017
// @namespace PZ
// @match https://www.parentzone.me/*
// @grant none
// @license MIT License
// @icon https://bvd2.nl/images/icon64.png
// ==/UserScript==

let style = document.createElement("style");
style.setAttribute("type", "text/css");
style.textContent = `
.new-comment {
display: flex;
}
.new-comment textarea {
margin: 0 10px 0 0;
}
.new-comment textarea:not(:focus),
.new-comment button {
height: 30px !important;
}
.event.today .icon {
background-color: #f28c27 !important;
}
`;

document.head.appendChild(style);


function highlightIconsForCurrentDay() {
    let dates;
    let interval = setInterval(() => {
        dates = document.querySelectorAll(".event .date span");

        // keep waiting for events to load
        if (!dates.length) {
            console.log("waiting");
            return;
        }

        clearInterval(interval);

        let events = document.querySelectorAll(".event");
        let curr = new Date();
        let currentMonth = curr.toLocaleString(navigator.language, { month: "long" });
        let currentDay = curr.getDate().toString();

        for(let i=0; i < dates.length; i++) {
            let dateStr = dates[i].textContent;
            // Post By xxxxx xxx at 09:33am December 5th
            let match = dateStr.match(/([a-z]+)\s([0-9]+)(th|nd|st)/i);
            console.log("Testing: " + dateStr);
            if (match && match[1] == currentMonth && match[2] == currentDay) {
                console.log("passed");
                events[i].classList.add("today");
            }
        }
    }, 500);

}

window.addEventListener("load", () => highlightIconsForCurrentDay());
