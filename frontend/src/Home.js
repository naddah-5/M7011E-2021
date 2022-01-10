import { useState, useEffect } from "react";
import EventList from "./EventList";
import {apiGetSimData, apiGetProsumerData} from "./useAPI";


function Home() {
    const [simEventResult, setEventResult] = useState([]);
    const [houseResult, setHouseResult] = useState([]);

    useEffect(async () => {
        let simEventResult_ = await apiGetSimData();
        let houseResult_ = await apiGetProsumerData();
        console.log("fetched sim data", simEventResult_.data.simEvents);
        console.log("fetched house data", houseResult_.data.prosumerEvents);
        setEventResult(simEventResult_.data.simEvents);
        setHouseResult(houseResult_.data.prosumerEvents);
    }, []);

  return ( 
      <div className="home">
          <EventList simEvent={simEventResult} house={houseResult}/>
      </div>
   );
} 
export default Home;
