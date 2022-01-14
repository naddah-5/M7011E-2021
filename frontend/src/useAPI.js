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

export async function apiGetProsumerData() {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          query:`{
            prosumerEvents {
              _id
              production
              netProduction
              buffer
            }}`
    })
  });

  return await response.json();
  }
  catch(e) {
      console.log(e);
    }
};


export async function apiUpdateHouseData(sellRatio, buyRatio) {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          query:`{
            login(
              buyRatio:"${buyRatio}",
              sellRatio:"${sellRatio}"
            ){
              buyRatio
              sellRatio
            }}`
        })
  });

  return await response.json();
  }
  catch(e) {
      console.log(e);
    }
};



