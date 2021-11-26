import {useState} from "react";
import EventList from "./EventList";


const Home = () => {


    const [events, setEvents] = useState([
        {title: "simon", body: "sdasdasdad", author: "asdasd", id: 1},
    ]);

    return ( 
        <div className="home">
            <EventList events={events} title="Current simulator data"/>
        </div>
     );
}
 
export default Home;