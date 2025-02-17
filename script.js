import cpiData from "./cpi.js";

/* ===== VARIABLES ===== */
const PREV_YEAR = 2024;

/* ===== ELEMENTS ===== */
const calendar = document.getElementById("calendar");
const output = document.getElementById("output");
const form = document.querySelector("form");
const copyBtn = document.querySelector(".copy-btn");

/* ===== FUNCTIONS ===== */

/**
 * Given a dollar amount, and a date (MM/YYY), calculate the inflation adjusted value, and display to user.
 * 
 * @param {Number} usd User-entered price in USD
 * @param {Number} month User-entered month
 * @param {Number} year User-entered year
 */
function calculateInflation(usd, month, year) {
    const cpiCurrent = cpiData[PREV_YEAR][11];
    const cpiOld = cpiData[year][month-1];
    const error = document.getElementById("error");

    const adjusted = (cpiCurrent/cpiOld) * usd;
    output.innerText = `${adjusted.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })}`;
    error.value = "";
    copyBtn.classList.add("show");
};

/**
 * Code that parses and verifies user input. If inputs are verified, we calculate price adjusted for inflation.
 * 
 * @param {SubmitEvent} e Event generated by submit action
 */
function handleSubmit(e) {
    e.preventDefault();
    const calendarError = document.getElementById("calendar-error");

    const monthPattern = /^(0?[1-9]|1[0-2])[-\/](\d{4})$/;
    const date = calendar.value.match(monthPattern);
    if (!date) {
        calendarError.innerText = "Invalid date format: must be MM/YYYY.";
        return;
    }

    const usd = parseFloat(document.getElementById("dollars").value);
    const [month, year] = date.slice(1, 3).map(n => parseInt(n));
    if (year < 1913 || year > PREV_YEAR) {
        if (year < 1913) {
            calendarError.innerText = "Calculator only accepts dates after December 1912.";
        } else {
            calendarError.innerText = `Calculator only accepts dates before January ${PREV_YEAR+1}.`
        }
        return;
    }

    calendarError.innerText = "";   // clear error if we made it this far
    calculateInflation(usd, month, year);
};

/**
 * Copy the inflation-adjusted value to the user's clipboard.
 */
function copyOutput() {
    const text = output.textContent;
    navigator.clipboard.writeText(text)
        .catch ((error) => console.error("There was a problem copying the text: ", error));
};

/* ===== EVENT LISTENERS ===== */
form.addEventListener("submit", handleSubmit);
copyBtn.addEventListener("click", copyOutput);
document.getElementById("dollars").focus();