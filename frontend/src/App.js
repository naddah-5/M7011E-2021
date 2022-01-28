import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import React from 'react';
import { useState, useEffect } from 'react';


function App() {

  const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    })

  return (
    <Router>
            <React.Fragment>
            <Navbar />
            <div className="content"></div>
            <Routes>
              {token && (<Route path="/" element={<Navigate to ="/home"/>}/>)}
              {token && (<Route exact path="/home" element={<Home/>}/>)}
              {token && (<Route exact path="/profile" element={<Profile/>}/>)}

              {!token && (<Route exact path="/login" element={<LoginPage/>}/>)}
              {!token && (<Route path="/" element={<Navigate to ="/login"/>}/>)}
              {!token && (<Route exact path="/register" element={<RegistrationPage/>}/>)}
            </Routes>
            </React.Fragment>
      </Router>
      
    
  );
}

export default App;
