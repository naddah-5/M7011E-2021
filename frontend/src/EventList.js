import { useEffect, useState, React } from "react";
import './home.css';
import InputField from './components/InputField';


 export default function EventList({simEvent, house}) {

    
    const [electricitySell,setElectricitySell] = useState("");
    const [electricityBuy,setElectricityBuy] = useState("");
    const [sellButtonDisabled, setSellButtonDisabled] = useState(false);
    const [buyButtonDisabled, setBuyButtonDisabled] = useState(false);


    const resetForm = () => {
        setElectricitySell("");
        setElectricityBuy("");
        setButtonDisabled(false);
    }    

    const [ev, setEvents] = useState([]);
    useEffect(() => {
        console.log(simEvent);
        setEvents(simEvent);
    }, [simEvent]);

   const [ho, setHouse] = useState([]);
    useEffect(() => {
        console.log(house);
        setHouse(house);
    }, [house]);


    


    return ( 
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
                    <h1>Production:</h1>
                    <h2>{ho.production} kW/h</h2>
                    <h1>NetProduction:</h1>
                    <h2>{ho.netProduction} kW/h</h2>
                    <h1>Buffer:</h1>
                    <h2>{ho.buffer} kW/h</h2>
                </div>

                    <div className="form-control">
                        <label htmlFor="market-sell">Sell to market</label>
                        <InputField
                        type="market-sell"
                        placeholder=""
                        value={electricitySell ? electricitySell : ""}
                        onChange={ (val) => setElectricitySell(val) }
                        />
                    </div>                        
                    <div>
                        <SubmitButton
                        text="Sell amount"
                        disabled={sellButtonDisabled}
                        onClick={ () => loginUser() }
                        />
                    </div>
                    <div>
                        <label htmlFor="market-buy">Buy from market</label>
                        <InputField
                        type="market-buy"
                        placeholder=""
                        value={electricityBuy ? electricityBuy : ""}
                        onChange={ (val) => setElectricityBuy(val) }
                        />
                    </div>
                    <div>
                        <SubmitButton
                        text="Buy amount"
                        disabled={buyButtonDisabled}
                        onClick={ () => loginUser() }
                        /> 
                    </div>
        </div>
    );
}
