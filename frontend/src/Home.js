import { useState, useEffect } from "react";
import {apiGetSimData, apiGetHouseData, apiUpdateBuyRatio, apiUpdateSellRatio} from "./useAPI";
import InputField from './components/InputField';
import SubmitButton from './components/SubmitButton';

function Home() {
    const [ev, setEventResult] = useState([]);
    const [ho, setHouseResult] = useState([]);

    useEffect(async () => {
        let simEventResult_ = await apiGetSimData();
        let houseResult_ = await apiGetHouseData();
        setEventResult(simEventResult_.data.simEvents);
        setHouseResult(houseResult_.data.getHouse);
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

    const [buy, setBuy] = useState([]);

    const setBuyRatio = async () => {
        let valid = true;
        valid = valid && !(electricityBuy.trim().length === 0);
        valid = valid && ((Number(electricityBuy) + ho.sellRatio) <= 1)
        valid = valid && (ho.production < ho.consumption)
        if(valid) {
            setBuyButtonDisabled(true);
            await apiUpdateBuyRatio(Number(electricityBuy));
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
            setSellButtonDisabled(true);
            await apiUpdateSellRatio(Number(electricityBuy));
            setSellButtonDisabled(false);
            window.location.reload(false);
        } else {
            resetForm();
            alert("Invalid ratio given")
            return(false);
        }

    }

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
    );
} 
export default Home;
