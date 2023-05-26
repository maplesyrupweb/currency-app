// let currencyAPIKey = "BXEh8fPVQeAN2jijFixukfmK2PNmKo83";
let currencyAPIKey = "6UGvcEOcu5uJ5WMCL0v0kBLyCRFyu5jP";
let theAnswer = document.getElementById("answer");
let theAnswerChangePCT = document.getElementById("answerPCT");


// window.onload = getData();

/**
 * On form submission, get values and call convert function
 */

function processForm() {

    let theAmount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;


    console.log(theAmount);
    console.log(fromCurrency);
    console.log(toCurrency);
    formConvert(theAmount,fromCurrency,toCurrency);
}

/**
 * On form submission, get values and call history function
 */


function processHistoryForm()
{
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;
    let historyDate = document.getElementById("date").value;
    console.log(historyDate.value);
    console.log(fromCurrency);
    console.log(toCurrency);
    getHistory(historyDate,fromCurrency,toCurrency);
}

/**
 * On form submission, get values and call fluctuation function
 */


function processFluctuationForm() 
{
    let fromDate = document.getElementById("startDate").value;
    let toDate = document.getElementById("endDate").value;
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;
    
    console.log(fromDate);
    console.log(toDate);
    console.log(fromCurrency);
    console.log(toCurrency);

    getFluctuation(fromDate,toDate,fromCurrency,toCurrency);

}

/**
 * Calculate the amount of change and % change for a chosen currency at a chosen interval
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} startCurrency 
 * @param {*} endCurrency 
 */

async function getFluctuation(startDate, endDate, startCurrency, endCurrency)
{
    // https://api.apilayer.com/exchangerates_data/fluctuation?start_date=2023-05-01&end_date=2023-05-20
    const apiURL =  "https://api.apilayer.com/exchangerates_data/fluctuation?start_date=" + startDate + "&end_date=" + endDate + "&base=" + startCurrency + "&symbols=" + endCurrency + "&apikey=" + currencyAPIKey;

    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("Fluctuation API result is: " , result);

            // USD: Object { start_rate: 0.737841, end_rate: 0.740988, change: 0.0031, … }
            // change: 0.0031
            // change_pct: 0.4265
            // end_rate: 0.740988
            // start_rate: 0.737841
            

            let tempResultChange = result.rates["USD"].change;
            let tempResultChangePCT = result.rates["USD"].change_pct;
            
            console.log("Result change is: " + tempResultChange);
            console.log("Result change % is: " + tempResultChangePCT);


            // let tempStringChange = "result.rates[" + endCurrency + "].change";
            // let tempAmountChange = tempStringChange;

            // // to access inside an object
            // let tempStringChangePCT = "result.rates[" + endCurrency + "].change_pct";
            // let tempAmountChangePCT = tempStringChangePCT;

            // console.log("the rate of change is: " + tempAmountChange);
            // console.log("the rate of change % is: " + tempAmountChangePCT);
            
            // outputData(tempAmount);



            theAnswer.innerHTML = tempResultChange;
            theAnswerChangePCT.innerHTML = tempResultChangePCT;
            
        }

}   catch (error) {
        if (error) throw error;
        console.log("Fluctuation API error ", error);
    
}


}

/**
 * Get the currency value at a specified date in the past
 * @param {*} dateInput 
 * @param {*} fromInput 
 * @param {*} toInput 
 */


async function getHistory(dateInput, fromInput, toInput) {

    const apiURL =  "https://api.apilayer.com/exchangerates_data/" + dateInput + "?symbols=" + toInput + "&base=" + fromInput + "&apikey=" + currencyAPIKey;

    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("History API result is: " , result);

            //CAD is hardcoded 
            //how to access the rates: Object { CAD: 1.34955 }
            let tempAmount = result.rates["USD"];
            console.log("the rate on that day is: " + tempAmount);
            
            outputData(tempAmount);
        }

}   catch (error) {
        if (error) throw error;
        console.log("History API error ", error);
    
}
 

}

/**
 * On form submission, provide the conversion result
 * @param {*} amountInput 
 * @param {*} fromInput 
 * @param {*} toInput 
 */

async function formConvert(amountInput, fromInput, toInput) {

    const apiURL =  "https://api.apilayer.com/exchangerates_data/convert?to=" + toInput + "&from=" + fromInput + "&amount=" + amountInput + "&apikey=" + currencyAPIKey;

    console.log(apiURL);
 
    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("Convert API result is: " , result);

            let tempResult = result.result;
            console.log("The conversion result is: " + tempResult);

            outputData(tempResult);
            
        }

} catch (error) {
    if (error) throw error;
    console.log("Convert API error ", error);
    let 
}
}


    



/**
 *  Run this form on page load
 */

// async function getData() {

//     const apiURL =  "https://api.apilayer.com/exchangerates_data/convert?to=USD&from=CAD&amount=1&apikey=BXEh8fPVQeAN2jijFixukfmK2PNmKo83"
 
//     try {
//         const response = await fetch(apiURL, {cache: "no-cache"});
//         const result = await response.json();
    
//         if (response.ok) {
//             console.log("Convert API result is: " , result);

//             let tempAmount = result.info.rate;
//             console.log("the rate is: " + tempAmount);
            
//             outputData(tempAmount);
//         }

// } catch (error) {
//     if (error) throw error;
//     console.log("Convert API error ", error);
//     let 
// }
// }


function outputData(answer) {
    // theAmount.innerHTML = amount;
    // fromCurrency.innerHTML = from;
    // toCurrency.innerHTML = to;
    theAnswer.innerHTML = answer;
}

async function topCurrencies() {

    const apiURL =  "https://api.apilayer.com/exchangerates_data/latest?symbols=CAD%2C%20GBP%2C%20EUR%2C%20CHF%2C%20KYD%2C%20KWD%2C%20KRW%2C%20CNY%2C%20INR&base=USD" + "&apikey=" + currencyAPIKey;

    https://api.apilayer.com/exchangerates_data/latest?symbols=CAD%2C%20GBP%2C%20EUR%2C%20CHF%2C%20KYD%2C%20KWD%2C%20KRW%2C%20CNY%2C%20INR

    console.log(apiURL);
 
    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("Latest API result is: " , result);

            let CAD = (result.rates["CAD"]).toFixed(2);
            let GBP = (result.rates["GBP"]).toFixed(2);
            let EUR = (result.rates["EUR"]).toFixed(2);
            let CHF = (result.rates["CHF"]).toFixed(2);
            let KYD = (result.rates["KYD"]).toFixed(2);
            let KWD = (result.rates["KWD"]).toFixed(2);
            let KRW = (result.rates["KRW"]).toFixed(2);
            let CNY = (result.rates["CNY"]).toFixed(2);
            let INR = (result.rates["INR"]).toFixed(2);
            let theDate = result.date;
            let timeStamp = result.timestamp;

            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(timeStamp * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            console.log(theDate);
            console.log(formattedTime);


            let answer01 = document.getElementById("answer01");
            let answer02 = document.getElementById("answer02");
            let answer03 = document.getElementById("answer03");
            let answer04 = document.getElementById("answer04");
            let answer05 = document.getElementById("answer05");
            let answer06 = document.getElementById("answer06");
            let answer07 = document.getElementById("answer07");
            let answer08 = document.getElementById("answer08");
            let answer09 = document.getElementById("answer09");
            
            answer01.innerHTML = CAD;
            answer02.innerHTML = GBP;
            answer03.innerHTML = EUR;
            answer04.innerHTML = CHF;
            answer05.innerHTML = KYD;
            answer06.innerHTML = KWD;
            answer07.innerHTML = KRW;
            answer08.innerHTML = CNY;
            answer09.innerHTML = INR;

            let updatedDate = document.getElementById("date");
            let updatedTime = document.getElementById("time");

            updatedDate.innerHTML = theDate;
            updatedTime.innerHTML = formattedTime;
            
            
        }

} catch (error) {
    if (error) throw error;
    console.log("Convert API error ", error);
    let 
}

 
    
}

/**
 *  Call the getTimeSeries function on form submission 
 */
function processTimeSeries() {
    console.log("process time series function");

    let fromDate = document.getElementById("startDate").value;
    let toDate = document.getElementById("endDate").value;
    let fromCurrency = document.getElementById("from").value;
    let toCurrency = document.getElementById("to").value;
    
    console.log(fromDate);
    console.log(toDate);
    console.log(fromCurrency);
    console.log(toCurrency);

    getTimeSeries();


}

/**
 * Get the table/graph for a currency at a specific time interval
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} startCurrency 
 * @param {*} endCurrency 
 */

async function getTimeSeries(startDate, endDate, startCurrency, endCurrency)
{
    
    // const apiURL =  "https://api.apilayer.com/exchangerates_data/fluctuation?start_date=" + startDate + "&end_date=" + endDate + "&base=" + startCurrency + "&symbols=" + endCurrency + "&apikey=" + currencyAPIKey;

    const apiURL = "https://api.apilayer.com/exchangerates_data/timeseries?start_date=2023-05-01&end_date=2023-05-07" + "&base=USD" + "&symbols=CAD" + "&apikey=" + currencyAPIKey;

    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("Timeseries API result is: " , result);

       
            
        drawGraph();

            
        }

}   catch (error) {
        if (error) throw error;
        console.log("Timeseries API error ", error);
    
}


}

function drawGraph() {
    const ctx = document.getElementById('myChart');
        
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1,
                backgroundColor: 'red'
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          
}