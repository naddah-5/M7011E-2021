import UserContext from "./User-context";
import { useContext } from "react";

function Profile () {

    const { token } = useContext(UserContext);
    return (        
                <div className="event-view">
                    <h1>{token}</h1>
                    
                </div>
    );
}
 
export default Profile;