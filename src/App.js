import React from 'react';
import { observer } from 'mobx-react';
import UserStore from     './stores/UserStore';
import LoginForm from     './components/LoginForm.js';
import SubmitButton from  './components/SubmitButton';
import './App.css';

class App extends React.Component {
async componentDidMount() {
  try {
    let res = await fetch('/isLoggedIn', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    let result = await res.json();

    if(result && result.success) {
      UserStore.loading = false;
      UserStore.isLoggedIn = true;
      UserStore.username = result.username;
    }
    else {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
      UserStore.username = "";
    }
  }

  catch(e) {
    UserStore.loading = false;
    UserStore.isLoggedIn = false;
    UserStore.username = "";
  }
}

async logoutUser() {
  try {
    let res = await fetch('/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    });

    let result = await res.json();

    if(result && result.success) {
      UserStore.isLoggedIn = false;
      UserStore.username = "";
    }

  }

  catch(e) {
    console.log(e);
  }
}

  render () {
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
              onClick={ () => this.loggoutUser()}
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
  
}

export default observer(App);