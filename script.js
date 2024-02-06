const PREV_YEAR = 2023;
const calendar = document.getElementById("calendar");
calendar.max = `${PREV_YEAR}-12`;  // last day of previous year

const form = document.querySelector("form");
form.addEventListener("submit", calculateInflation);

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

async function calculateInflation(e) {
    e.preventDefault();
    
    const usd = parseFloat(document.getElementById("dollars").value);
    const date = calendar.value;
    const [year, month] = date.split("-").map(n => parseInt(n));

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