const calendar = document.getElementById("calendar");
calendar.max = new Date().toISOString().split("T")[0];  // current date

const form = document.querySelector("form");
form.addEventListener("submit", calculateInflation);

async function calculateInflation(e) {
    e.preventDefault();
    
    const usd = document.getElementById("dollars").value;
    const date = calendar.value;
    const output = document.getElementById("output");

    console.log(usd, date);
};