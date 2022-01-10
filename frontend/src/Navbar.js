import { NavLink } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>ElectroSimulator</h1>
            <div className="links">
                <ul>
                    <li>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;