import React from "react";

export default async function apiGet() {
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
