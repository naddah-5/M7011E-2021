import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import React from 'react';
import { useState, useMemo } from 'react';
import UserContext from './User-context';


function App() {

  const [token, setToken] = useState(null);

  const value = useMemo(
    () => ({ token, setToken }), 
    [token]
  );

  return (
    <Router>
          <React.Fragment>
            <UserContext.Provider value={value}>
            <Navbar />
            <div className="content"></div>
            <Routes>
              {token && (<Route path="/" element={<Navigate to ="/home"/>}/>)}
              {token && (<Route exact path="/home" element={<Home/>}/>)}
              {token && (<Route exact path="/profile" element={<Profile/>}/>)}

              <Route exact path="/login" element={<LoginPage/>}/>

              {!token && (<Route path="/" element={<Navigate to ="/login"/>}/>)}
              {!token && (<Route exact path="/register" element={<RegistrationPage/>}/>)}
            </Routes>
            </UserContext.Provider>
          </React.Fragment>
      </Router>
      
    
  );
}

export default App;
