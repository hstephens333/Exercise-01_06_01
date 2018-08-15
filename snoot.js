
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
var formValidity = true;

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
    // Cover for no month is selected
    if (deliveryMonth.selectedIndex === -1) {
        return;
    }
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    if (deliveryYear.selectedIndex === -1) {
        deliveryDay.selectedIndex = 0;
    }
    // if Feb and 2020 twentynine
    if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020"); {
        deliveryDay.appendChild(twentynine.cloneNode(true));
    }
    // else if 30 day month thirty 
    if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
        deliveryDay.appendChild(thirty.cloneNode(true));
    }
    // else if 31 day month thirtyone
    else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7"
        || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
        deliveryDay.appendChild(thirtyone.cloneNode(true));
    }
}

// Function to inspect custom checkbox on message chain
function autoCheckCustom() {
    var messageBox = document.getElementById("customText");
    // textarea has message, check the box
    if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
        document.getElementById("custom").checked = "checked";
    }
    // text area has no message, uncheck the box
    else {
        document.getElementById("custom").checked = "";
    }
}

// Function to copy billing to delivery address
function copyBillingAddress() {
    var billingInputElements = document.querySelectorAll("#billingAddress input");
    var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
    // Duplicate addresses - Checkbox is checked - Copy
    if (document.getElementById("sameAddr").checked) {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = billingInputElements[i].value;
        }
        document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
    }
    // Duplicate addresses - Checkbox is not checked - Erase
    else {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = "";
        }
        document.querySelector("#deliveryAddress select").selectedIndex = -1;
    }
}

// Function to validate delivery date
function validateDeliveryDate() {
    var selectElements = document.querySelectorAll("#deliveryDate" + " select");
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = selectElements.length;
    var currentElement;
    try {
        // Loop through input fields looking for blanks
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            // Blanks
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            }
            // Not Blanks
            else {
                currentElement.style.border = "1px solid white";
            }
        }
        // Action for invalid fieldset
        if (fieldsetValidity === false) {
            throw "Please specify a Delivery Date"
        }
        else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }
    catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

// Function to validate payment
function validatePayment() {
    var errorDiv = document.querySelectorAll("#paymentInfo" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var ccNumElement = document.getElementById("ccNum");
    var selectElements = document.querySelectorAll("#paymentInfo" + " select");
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv");
    var cards = document.getElementsByName("PaymentType");
    var currentElement;
    try {
        // Validate radio buttons one must be on
        if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "1px solid red";
            }
            fieldsetValidity = false;
        }
        else {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "";
            }
        }
        // Validate req'd card nbr
        if (ccNumElement.value === "") {
            ccNumElement.style.background = "rgb(255, 233, 233)";
            formValidity = false;
        }
        else {
            ccNumElement.style.background = "white";
        }
        // Validate Experation Date
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            // Blanks
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            }
            // Not Blanks
            else {
                currentElement.style.border = "1px solid white";
            }
        }
        // Validate cvv nbr
        if (cvvElement.value === "") {
            cvvElement.style.background = "rgb(255, 233, 233)";
            formValidity = false;
        }
        else {
            cvvElement.style.background = "white";
        }
        // Action for invalid fieldset
        if (fieldsetValidity === false) {
            throw "Please Complete all Payment info.";
        }
        else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }
    catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

// Function to validate custom messages
function validateMessage() {
    var msgBox = document.getElementById("customText");
    var errorDiv = document.querySelectorAll("#message" + " .errorMessage")[0];
    var fieldsetValidity = true;
    try {
        // Validate checkbox and textarea
        if (document.getElementById("custom").checked && (msgBox.value === "" || msgBox.value === msgBox.placeholder)) {
            throw "Please enter your custom message text";
        }
        else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
            msgBox.style.background = "white";
        }
    }
    catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        msgBox.style.background = "rgb(255, 233, 233)";
        formValidity = false;
    }
}

// Function to validate address - billing & delivery
function validateAddress(fieldsetId) {
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;
    try {
        // Loop through input fields looking for blanks
        for (var i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];
            // Blanks
            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255, 233, 233)";
                fieldsetValidity = false;
            }
            // Not Blanks
            else {
                currentElement.style.background = "white";
            }
        }
        // Validate select list field
        currentElement = document.querySelectorAll("#" + fieldsetId + " select")[0];
        if (currentElement.selectedIndex === -1) {
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        }
        else {
            currentElement.style.border = "";
        }

        // Action for invalid fieldset
        if (fieldsetValidity === false) {
            if (fieldsetId === "billingAddress") {
                throw "Please complete all Billing Address information"
            }
            else {
                throw "Please complete all Delivery Address information"
            }
        }
        else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }
    catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}



// Function to validate entire form validity
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
    formValidity = true;

    validateAddress("billingAddress");
    validateAddress("deliveryAddress");
    validateDeliveryDate();
    validatePayment();
    validateMessage();

    if (formValidity === true) { // Form is valid
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display = "none";
        document.getElementsByTagName("form")[0].submit();
    }
    else {
        document.getElementById("errorText").innerHTML = "Please Fix the Indicated Problems and then Resubmit Your Order";
        document.getElementById("errorText").style.display = "block";
        scroll(0, 0);
    }
}

// Function that sets up page on load event
function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListeners();
}

// Function to create our event listeners
function createEventListeners() {
    var deliveryMonth = document.getElementById("delivMo");
    if (deliveryMonth.addEventListener) {
        deliveryMonth.addEventListener("change", updateDays, false);
    } else if (deliveryMonth.attachEvent) {
        deliveryMonth.attachEvent("onchange", updateDays);
    }
    var deliveryYear = document.getElementById("delivYr");
    if (deliveryYear.addEventListener) {
        deliveryYear.addEventListener("change", updateDays, false);
    } else if (deliveryYear.attachEvent) {
        deliveryYear.attachEvent("onchange", updateDays);
    }
    var messageBox = document.getElementById("customText");
    if (messageBox.addEventListener) {
        messageBox.addEventListener("change", autoCheckCustom, false);
    } else if (messageBox.attachEvent) {
        messageBox.attachEvent("onchange", autoCheckCustom);
    }
    var same = document.getElementById("sameAddr");
    if (same.addEventListener) {
        same.addEventListener("change", copyBillingAddress, false);
    } else if (same.attachEvent) {
        same.attachEvent("onchange", copyBillingAddress);
    }
    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateForm);
    }
}

// Page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}