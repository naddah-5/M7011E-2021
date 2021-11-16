
function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve

function getWind (windMin,windMax) {
    let currentWind = randn_bm(windMin, windMax,1);
    windMin = currentWind-5.0;
    windMax = currentWind+5.0;
    if(windMin < 0.0 || windMax > 40.0) {
        windMin = windMin+5.0;
        windMax = windMax-5.0;
    }
    return [currentWind, windMin, windMax];
}


function getElectricityConsumption(eleMin, eleMax) {
    let eleconsumed = randn_bm(eleMin, eleMax,1);
    eleMin = eleconsumed-2.0;
    eleMax = eleconsumed+2.0;
    if(eleMin < 6.0 || eleMax > 25.0) {
        eleMin = eleMin+2.0;
        eleMax = eleMax-2.0;
    }
    return [eleconsumed, eleMin, eleMax];
}

//https://www.sodrahallandskraft.se/produkter-och-priser/elnaet/sveriges-elnaet-lite-fakta/elanvaendning-i-sverige/

function getPrice(wind,consumption) {
    let price = 115.0 + (consumption-wind);
    return price;
}

//www.energimarknadsbyran.se/el/dina-avtal-och-kostnader/elkostnader/elforbrukning/normal-elforbrukning-och-elkostnad-for-villa/


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


simulator(0.0,40.0,6.0,25.0);

async function simulator(windMin, windMax, eleMin, eleMax) {
   let windData = getWind(windMin, windMax);
   let consumption = getElectricityConsumption(eleMin, eleMax);
   let price = getPrice(windData[0],consumption[0]);
   await sleep(2000);
   console.log("CurrentWind: ");
   console.log(windData[0].toFixed(2) + "\n");
   console.log("CurrentConsumption: ");
   console.log(consumption[0].toFixed(2) + "\n");
   console.log("Price: ");
   console.log(price.toFixed(2) + "\n");
   simulator(windData[1], windData[2],consumption[1],consumption[2]);

}



