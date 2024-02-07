const PREV_YEAR = 2023;
const calendar = document.getElementById("calendar");
calendar.max = `${PREV_YEAR}-12`;  // last day of previous year

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

async function readLocalStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, result => {
            if (key in result) {
                resolve(result[key]);
            } else {
                reject();
            }
        });
    });
};

async function getCpi(month, year) {
    try {
        const months = await readLocalStorage(year.toString());
        return parseFloat(months[month] ? months[month] : months.at(-1)); 
    } catch (error) {
        return undefined;
    }
};

async function calculateInflation(usd, month, year) {
    const cpiCurrent = await getCpi(12, PREV_YEAR);
    const cpiOld = await getCpi(month, year);

    const output = document.getElementById("output");
    const error = document.getElementById("error");
    if (typeof cpiCurrent !== "undefined" && typeof cpiOld !== "undefined"){
        const adjusted = (cpiCurrent/cpiOld) * usd;
        output.innerText = `$${adjusted.toFixed(2)}`;
        error.innerText = "";
    } else {
        output.innerText = "";
        error.innerText = "There was a problem during the calculation process. If the problem persists, reinstall the extension.";
    }
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
}