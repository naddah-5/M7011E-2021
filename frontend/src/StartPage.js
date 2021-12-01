import React, { useEffect, useState } from    'react';
import UserStore from               './stores/UserStore';
import LoginForm from               './components/LoginForm.js';
import SubmitButton from            './components/SubmitButton';
import LogoutUser from              './components/Logout';
import './App.css';


function StartPage(props) {
  const [loggedIn, setLoggedIn] = useState("");

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
    return(
      <div className="app">
        <div className="container">
          welcome {UserStore.username}

          <SubmitButton
            text={"Log out"}
            disabled={false}
            onClick={ () => {
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
      </div>
    </div>
    );
  
}

export default StartPage;