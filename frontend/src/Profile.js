import { useState } from "react";

function Profile () {

    const token = useState(localStorage.getItem('token'));
    const userId = useState(localStorage.getItem('userId'));

    return (        
                <div className="event-view">
                    <h1>{token}</h1>
                    {console.log(token)}
                    <h1>{userId}</h1>
                    
                </div>
    );
}
 
export default Profile;