import { useState, useEffect } from "react";
import EventList from "./EventList";
import apiGet from "./useAPI";


function Home() {
    const [result, setResult] = useState([]);

    useEffect(async () => {
        let result_ = await apiGet();
        console.log(result_);
        setResult(result_);
    }, []);

  return ( 
      <div className="home">
          <EventList events={result} title="Current simulator data"/>
      </div>
   );
} 
export default Home;
