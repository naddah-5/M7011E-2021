import { NavLink } from "react-router-dom";
import UserContext from "./User-context";
import { useContext } from "react";

const Navbar = () => {
    const { token } = useContext(UserContext);
    return ( 
        <nav className="navbar">
            <h1>ElectroSimulator</h1>
            <div className="links">
                <ul>
                    {token && (
                   <li>
                        <NavLink to="/home">Home</NavLink>
                    </li> 
                    )}
                    {token && (
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                    )}
                    {!token && (
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    )}
                    {token && (
                    <li>
                        <NavLink to="/login">Logout</NavLink>
                    </li>
                    )}
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;