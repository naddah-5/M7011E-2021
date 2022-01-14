import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import StartPage from './StartPage';
import RegistrationPage from './RegistrationPage'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';


function App() {

  return (
    <Router>
      <Navbar />
      <div className="content">
          <React.Fragment>
            <Routes>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/profile" element={<Profile/>}/>
                <Route exact path="/" element={<StartPage/>}/>
            </Routes>
          </React.Fragment>
          </div>
        </Router>
      
    
  );
}

export default App;
