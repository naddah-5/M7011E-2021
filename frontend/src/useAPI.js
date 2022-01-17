import React from "react";

export async function apiGetSimData() {
    try {
      const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            query:`{
              simEvents {
                _id
                windSpeed
                electricityDemand
                price
                date
              }}`
      })
    });

    return await response.json();
    }
    catch(e) {
        console.log(e);
      }
};

export async function apiGetHouseData() {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          query:`{
            getHouse(houseGet: {
              userId: "${"61e1d856a423ffc764ea3036"}"
            }) {
              _id
              address
              windTurbineID {
                efficiency
              }
              batteryID {
                capacity
              }
              consumption
              minConsumption
              maxConsumption
              buyRatio
              sellRatio
              production
              netProduction
            }}`
    })
  });

  return await response.json();
  }
  catch(e) {
      console.log(e);
    }
}; 


export async function apiUpdateBuyRatio(buyRatio) {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          query:`
            mutation {
              updateHouseBuyRatio(houseBuyRatio: {
                userId: "${"61e1d856a423ffc764ea3036"}"
                buyRatio: ${buyRatio}
              }) {
                buyRatio
              }
            }`
        })
  });

  return await response.json();
  }
  catch(e) {
      console.log(e);
    }
};

export async function apiUpdateSellRatio(sellRatio) {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          query:`
            mutation {
              updateHouseSellRatio(houseSellRatio: {
                userId: "${"61e1d856a423ffc764ea3036"}"
                sellRatio: ${sellRatio}
              }) {
                sellRatio
              }
            }`
        })
  });

  return await response.json();
  }
  catch(e) {
      console.log(e);
    }
};



