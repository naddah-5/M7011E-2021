/* DEPRICATED CLASS */

/* GET LATEST DATA FROM GLOBAL SIMULATOR */
export async function apiGetSimData(token) {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

/* GET LASTEST HOUSE DATA FROM CURRENT USER */
export async function apiGetHouseData() {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          query:`{
            getHouse(getHouse: {
              userId: "${"61eddb33e65f0a5cdd62fa2e"}"
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

/* UPDATE CURRENT USERS HOUSE RATIO OF BUYING FROM MARKET */
export async function apiUpdateBuyRatio(userId, buyRatio) {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          query:`
            mutation {
              updateHouseBuyRatio(buyRatioInput: {
                userId: "${userId}"
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

/* UPDATE CURRENT USERS HOUSE RATIO OF SELLING TO THE MARKET */
export async function apiUpdateSellRatio(userId, sellRatio) {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          query:`
            mutation {
              updateHouseSellRatio(sellRatioInput: {
                userId: "${userId}"
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

/* GET CURRENT USER INFORMATION */
export async function apiGetUser(token) {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body:JSON.stringify({
          query:`{
            getUser {
              email
              firstName
              lastName
              birthDate
              address
              picture
            }}`
    })
  });

  return await response.json(); 
  }
  catch(e) {
    console.log(e);
  }
};

