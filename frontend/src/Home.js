import {useState} from "react";
import EventList from "./EventList";
import { loginQuery } from "./useAPI";


const Home = () => {

    const loginData = loginQuery("hejsan", "123");

    const [events, setEvents] = useState([
        {title: loginData.data.login["userId"], body: "sdasdasdad", author: "asdasd", id: 1},
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
