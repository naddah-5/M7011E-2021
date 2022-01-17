import React, { useState, useContext } from    'react';
import { useNavigate } from          'react-router-dom'
import UserStore from               './stores/UserStore';
import LoginForm from               './components/LoginForm.js';
import SubmitButton from            './components/SubmitButton';
import LogoutUser from              './components/Logout';
import RegistrationPage from        './RegistrationPage'
import './App.css';
import UserContext from './User-context';


function StartPage() {
  const [loggedIn, setLoggedIn] = useState("");
  const navigate = useNavigate();

  const {setToken}  = useContext(UserContext);
  
  if(UserStore.loading){
    return(
      <div className="app">
        <div className="container">
        Please wait, I am loading...
        </div>
      </div>
    )
  }
  else if(UserStore.isLoggedIn){
    setToken(UserStore.authToken);
    return(
      <div className="app">
        <div className="container">
          welcome {UserStore.username}

          <SubmitButton
            text={"Log out"}
            disabled={false}
            onClick={ () => {
              setToken(null);
              LogoutUser()
              setLoggedIn(false)
            }}
            />
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="container">
        <LoginForm
          onSuccess={() => {
            setLoggedIn(true);
          }}
          />
        <SubmitButton
          text={"Register"}
          disabled={false}
          onClick={ () => {
            console.log("Registration button was clicked");
            navigate('/register', { replace: true })
          }
          }
        />
      </div>
    </div>
    );
  
}

export default StartPage;