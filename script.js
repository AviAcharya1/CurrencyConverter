const dropList = document.querySelectorAll(".droplist select"),
fromCurrency  = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
    
getButton = document.querySelector("form button")
for (let i = 0; i < dropList.length; i++){
    for (currency_code in country_code) {
        // console.log(currency_code)
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "INR" ? "selected" : "";
        }
        //creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserting Options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for (code in country_code) {
        if (code == element.value) {//if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img");//selecting img tag of particular drop list
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png/`
       } 
    }
}

window.addEventListener("load", () => {
    getExChangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();//preventing form form submitting multiple times
    getExChangeRate();
});

const exchangeIcon = document.querySelector(".droplist .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExChangeRate();
})

api_key = "e9be2bf77758113d8046f3a3";

function getExChangeRate() {
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == 0) {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting Exchange rate...."
    let url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        // console.log(exchangeRate);
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        // console.log(totalExchangeRate)
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch (() => {
        exchangeRateTxt.innerText = "Something went wrong...";
    })
}