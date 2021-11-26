import {useState} from "react";
import EventList from "./EventList";


const Home = () => {


    const [events, setEvents] = useState([
        {title: "hej", body: "sdasdasdad", author: "asdasd", id: 1},
        {title: "adada", body: "fsfasfas", author: "asdsada", id: 2},
        {title: "asdadad", body: "sdasdad", author: "adasd", id: 3}
    ]);

    return ( 
        <div className="home">
            <EventList events={events} title="Current simulator data"/>
        </div>
     );
}
 
export default Home;
