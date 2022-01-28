import React, { useState } from    'react';
import { useNavigate } from          'react-router-dom'
import UserStore from               './stores/UserStore';
import LoginForm from               './components/LoginForm.js';
import SubmitButton from            './components/SubmitButton';
import LogoutUser from              './components/Logout';
import './App.css';


function LoginPage() {
  const [loggedIn, setLoggedIn] = useState("");
  const navigate = useNavigate();

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
    localStorage.setItem('token', UserStore.authToken);
    localStorage.setItem('userId', UserStore.userId);
    window.location.reload(false);

    
    return(
      <div className="app">
        <div className="container">
          welcome {UserStore.username}

          <SubmitButton
            text={"Log out"}
            disabled={false}
            onClick={ () => {
              localStorage.removeItem('userId');
              localStorage.removeItem('token');
              LogoutUser()
              setLoggedIn(false)
              window.location.reload(false);
            }}
            />
        </div>
      </div>
    );
  }
  else{
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
}

export default LoginPage;