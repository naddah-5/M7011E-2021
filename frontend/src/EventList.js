import { useEffect, useState, React } from "react";
import './home.css';
import InputField from './components/InputField';


 export default function EventList(simEvent) {

    
    /* const [electricitySell,setElectricitySell] = useState("");
    const [electricityBuy,setElectricityBuy] = useState("");
    const [sellButtonDisabled, setSellButtonDisabled] = useState(false);
    const [buyButtonDisabled, setBuyButtonDisabled] = useState(false);


    const resetForm = () => {
        setElectricitySell("");
        setElectricityBuy("");
        setButtonDisabled(false);
    }  */  

    const [ev, setEvents] = useState([]);
    useEffect(() => {
        setEvents(simEvent);
    }, [simEvent]);

   /*const [ho, setHouse] = useState([]);
    useEffect(() => {
        console.log(house);
        setHouse(house);
    }, [house]); */


  /* const setHouse = async () => {
        // if either the username or password is empty we wont bother handling the log in request
        if(electricitySell.trim().length === 0) {
          resetForm();
          alert("Incorrect selling ratio")
          return(false);
        }
        if(electricityBuy.trim().length === 0) {
          resetForm();
          alert("Incorrect buying ratio")
        return(false);
        }

        setButtonDisabled(false); */

    /* let efficiency;
    let buffer;
    if(ho.windTurbineID) {
        efficiency = <h2>{ho.windTurbineID.efficiency} %</h2>
    } else {
        efficiency = <h2> NA </h2>
    }
    if(ho.batteryID) {
        buffer = <h2>{ho.windTurbineID.capacity} %</h2>
    } else {
        buffer = <h2> NA </h2>
    } */

    //console.log("Utanför", ev["data"]);

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

        </div>
     );
}
