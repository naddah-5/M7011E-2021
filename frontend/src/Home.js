import { useState, useEffect } from "react";
import EventList from "./EventList";
import {apiGetSimData, apiGetProsumerData} from "./useAPI";


function Home() {
    const [simEventResult, setEventResult] = useState([]);
    const [prosumerResult, setProsumerResult] = useState([]);

    useEffect(async () => {
        let simEventResult_ = await apiGetSimData();
        let prosumerResult_ = await apiGetProsumerData();
        console.log("fetched sim data", simEventResult_.data.simEvents);
        console.log("fetched house data", prosumerResult_.data.prosumerEvents);
        setEventResult(simEventResult_.data.simEvents);
        setProsumerResult(prosumerResult_.data.prosumerEvents);
    }, []);

  return ( 
      <div className="home">
          <EventList simEvent={simEventResult} house={prosumerResult}/>
      </div>
   );
} 
export default Home;
