import { useState, useEffect, Fragment} from "react";
import InputField from './components/InputField';
import SubmitButton from './components/SubmitButton';


function Home() {
    const [ev, setEventResult] = useState([]);
    const [ho, setHouseResult] = useState([]);


    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    })

    useEffect(async () => {
       
        try {
        
          const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token
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
      
          let eventResult = await res.json();
          setEventResult(eventResult.data.simEvents);
          }
          catch(e) {
            console.log(e);
          }

        try {
          const res = await fetch("http://localhost:4000/graphql", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('token')
              },
              body:JSON.stringify({
                query:`{
                  getHouse(getHouse: {
                    userId: "${localStorage.getItem('userId')}"
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
      
        let houseResult = await res.json();
        setHouseResult(houseResult.data.getHouse);
        }
        catch(e) {
            console.log(e);
          }
    }, []);



    const [electricitySell,setElectricitySell] = useState("");
    const [electricityBuy,setElectricityBuy] = useState("");
    const [sellButtonDisabled, setSellButtonDisabled] = useState(false);
    const [buyButtonDisabled, setBuyButtonDisabled] = useState(false);

    const resetForm = () => {
        setElectricitySell("");
        setElectricityBuy("");
        setSellButtonDisabled(false);
        setBuyButtonDisabled(false);
    }

  

    const setBuyRatio = async () => {
        let valid = true;
        valid = valid && !(electricityBuy.trim().length === 0);
        valid = valid && ((Number(electricityBuy) + ho.sellRatio) <= 1)
        valid = valid && (ho.production < ho.consumption)
        if(valid) {
            const buyRatio = Number(electricityBuy);
            setBuyButtonDisabled(true);
            try {
                fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem('token')
                    },
                    body:JSON.stringify({
                      query:`
                        mutation {
                          updateHouseBuyRatio(buyRatioInput: {
                            userId: "${localStorage.getItem('userId')}"
                            buyRatio: ${buyRatio}
                          }) {
                            buyRatio
                          }
                        }`
                    })
                });
            
              }
              catch(e) {
                  console.log(e);
                }
            setBuyButtonDisabled(false);
            window.location.reload(false);

        } else {
            resetForm();
            alert("Invalid ratio given")
            return(false);
        }
    }

    const setSellRatio = async () => {
        let valid = true;
        valid = valid && !(electricitySell.trim().length === 0);
        valid = valid && ((Number(electricitySell) + ho.buyRatio) <= 1)
        valid = valid && (ho.production > ho.consumption)
        if(valid) {
            const sellRatio = Number(electricitySell);
            setSellButtonDisabled(true);
            try {
                fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem('token')
                    },
                    body:JSON.stringify({
                      query:`
                        mutation {
                          updateHouseSellRatio(sellRatioInput: {
                            userId: "${localStorage.getItem('userId')}"
                            sellRatio: ${sellRatio}
                          }) {
                            sellRatio
                          }
                        }`
                    })
                });
            
              }
              catch(e) {
                  console.log(e);
                }
            
            setSellButtonDisabled(false);
            window.location.reload(false);
        } else {
            resetForm();
            alert("Invalid ratio given")
            return(false);
        }
    } 

    return (
        <Fragment>
        <div className="event-list">
            <h2>Current simulator data</h2>   
                <div className="event-view" key={ev._id}>
                    <h1>Windspeed:</h1>
                    <h2>{ev.windSpeed} m/s</h2>
                    <h1>Electricity consumption:</h1>
                    <h2>{ev.electricityDemand} kW/h</h2>
                    <h1>Electricity price:</h1>
                    <h2>{ev.price} öre</h2>
                    <h1>Date:</h1>
                    <h2>{ev.date}</h2>
                </div>

                <h2>Current house data</h2>         
                <div className="event-view" key={ho._id}>
                    <h1>Consumption:</h1>
                    <h2>{ho.consumption} kW/h</h2>
                    <h1>Min consumption:</h1>
                    <h2>{ho.minConsumption} kW/h</h2>
                    <h1>Max consumption:</h1>
                    <h2>{ho.maxConsumption} kW/h</h2>
                    <h1>Buy ratio:</h1>
                    <h2>{ho.buyRatio}</h2>
                    <h1>Sell ratio:</h1>
                    <h2>{ho.sellRatio}</h2>
                    <h1>Production:</h1>
                    <h2>{ho.production} kW/h</h2>
                    <h1>NetProduction:</h1>
                    <h2>{ho.netProduction} kW/h</h2>
                </div>

                <div className="form-control">
                    <label htmlFor="market-sell">Change sell ratio</label>
                    <InputField
                    type="market-sell"
                    placeholder=""
                    value={electricitySell ? electricitySell : ""}
                    onChange={ (val) => setElectricitySell(val) }/>
                </div>                        
                <div>
                    <SubmitButton
                    text="Update"
                    disabled={sellButtonDisabled}
                    onClick={ () => setSellRatio()}/>
                </div>
                <div>
                    <label htmlFor="market-buy">Change buy ratio</label>
                    <InputField
                    type="market-buy"
                    placeholder=""
                    value={electricityBuy ? electricityBuy : ""}
                    onChange={ (val) => setElectricityBuy(val) }/>
                </div>
                <div>
                    <SubmitButton
                    text="Update"
                    disabled={buyButtonDisabled}
                    onClick={ () => setBuyRatio() }/> 
                </div>
        </div>
        </Fragment>
    );
} 
export default Home;
