import React, { useEffect } from         'react';
import { observer } from  'mobx-react';
import UserStore from     './stores/UserStore';
import LoginForm from     './components/LoginForm.js';
import SubmitButton from  './components/SubmitButton';
import './App.css';
import LogoutUser from './components/Logout';

function App() {
  useEffect (async () => {
    try {
      const res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
  
      let result = await res.json();
  
      if(res.status === 200) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        UserStore.loading = false;

      }
      else {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
        UserStore.loading = false;

      }
    }
  
    catch(e) {
      console.log("Error in checking logged in users from db: " + e);
      UserStore.isLoggedIn = false;
      UserStore.username = "";
      UserStore.loading = false;

    }
  }, [])
/*
const logoutUser = async () => {
  try {

   UserStore.loading = true;
   UserStore.username = "";
   UserStore.userId = "";
   UserStore.authToken = "";
   UserStore.isLoggedIn = false;
   UserStore.loading = false;
   console.log("Logout complete");

  }

  catch(e) {
    console.log(e);
  }
}*/

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
            onClick={ () => LogoutUser()}
            />
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="container">
        <LoginForm/>
      </div>
    </div>
    );
  
}

export default observer(App);