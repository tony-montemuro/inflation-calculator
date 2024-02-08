import cpiData from "./cpi.js";

const PREV_YEAR = 2023;
const calendar = document.getElementById("calendar");
const output = document.getElementById("output");

const form = document.querySelector("form");
const copyBtn = document.querySelector(".copy-btn");
form.addEventListener("submit", handleSubmit);
copyBtn.addEventListener("click", copyOutput);

async function calculateInflation(usd, month, year) {
    const cpiCurrent = cpiData[PREV_YEAR][11];
    const cpiOld = cpiData[year][month];
    const error = document.getElementById("error");

    const adjusted = (cpiCurrent/cpiOld) * usd;
    output.innerText = `${adjusted.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })}`;
    error.value = "";
    copyBtn.classList.add("show");
};

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

function copyOutput() {
    const text = output.textContent;
    navigator.clipboard.writeText(text)
        .catch ((error) => console.error("There was a problem copying the text: ", error));
};