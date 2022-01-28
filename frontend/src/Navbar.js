import { NavLink } from "react-router-dom";
import {  useState, useEffect } from "react";
import LogoutUser from './components/Logout'

const Navbar = () => {

    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    })
    
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
                        <button onClick={ () => {
                        localStorage.removeItem('userId');
                        localStorage.removeItem('token');
                        LogoutUser()
                        window.location.reload(false);
                        }}>Logout</button>
                    </li>
                    )}
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;