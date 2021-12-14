 export default async function EventList(events, title) {
    if (events === []){
        return ( 
            <div className="event-list">
                <h2>{title}</h2>         
                {events.map((event) => (
                    <div className="event-view" key={event._id}>
                        <h2>{event.data.simEvents.windSpeed}</h2>
                        <h2>{event.data.simEvents.electricityDemand}</h2>
                        <h2>{event.data.simEvents.price}</h2>
                        <h2>{event.data.simEvents.date}</h2>
                    </div>
                ))}
            </div>
         );
    } else{
        return(<></>);
    }
    
}