/*
    Filename: snoot.js
    Form Validation code for snoot.html

    Author: Harrison Stephens
    Date: 1.6.18

*/

"use strict";

// Variables
var twentynine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyone = document.createDocumentFragment();

// Function to remove select list defaults
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

// Function to set up documnt fragments for days of the month
function setUpDays() {
    var dates = document.getElementById("delivDy").getElementsByTagName("option");
    twentynine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyone.appendChild(dates[28].cloneNode(true));
    thirtyone.appendChild(dates[29].cloneNode(true));
    thirtyone.appendChild(dates[30].cloneNode(true));
}

// Function to set up the list of days
function updateDays() {
    var deliveryDay = document.getElementById("delivDy");
    var dates = deliveryDay.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("delivMo");
    var deliveryYear = document.getElementById("delivYr");
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    if (deliveryYear.selectedIndex === -1) {
        deliveryDay.selectedIndex = 0;
    }
}

// Function that sets up page on load event
function setUpPage() {
    removeSelectDefaults();
    // setUpDays();
    // updateDays();
}

// Page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}