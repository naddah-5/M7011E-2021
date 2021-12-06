import React, { useState, useEffect } from 'react';
/*import Express from 'express';
import bodyParser from 'body-parser';*/
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from '../stores/UserStore';

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setButtonDisabled(false);
  }

  const loginUser = async () => {
    // if either the username or password is empty we wont bother handling the log in request
    if(!username) {
      resetForm();
      alert("Incorrect username or password")
      return(false);
    }
    else if(!password) {
      resetForm();
      alert("Incorrect username or password")
    return(false);
    }

    //disable the login button so that we don't flood the api with login requests 
    setButtonDisabled(true);
    try {
      // ONLY FOR TESTING!!!
      console.log(username);
      console.log(password);
      //

      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          query:`{
            login(
              email:"${username}",
              password:"${password}"
            ){
              token
              userId
            }}`
        })
      });

      //wait for the ASYNC result to arrive before we try to do anything with it
      let result = await res.json();


      //if the login is successful update the user store
      if(res.status === 200) {
        UserStore.loading = true;
        console.log(result.data);
        console.log(res.status);
        UserStore.isLoggedIn = true;
        UserStore.username = username;

        console.log("the stored username is: " + UserStore.username)

        UserStore.userId =  result.data.login["userId"];
        UserStore.authToken = result.data.login["token"];


        console.log("the stored user ID is: " + UserStore.userId);
        console.log("the stored auth token is: " + UserStore.authToken);


        UserStore.loading = false;
        setButtonDisabled(false);
        props.onSuccess();
      }
      else if(res.status === 500) {
        resetForm();
        alert("Incorrect username or password")
      }

    }
    catch(e) {
      console.log(e);
      resetForm();
    }
  }
  
  return(
    <div className="loginForm"> 
      Log in
      <InputField
        type="text"
        placeholder="Username"
        value={username ? username : ""}
        onChange={ (val) => setUsername(val) }
      />

      <InputField
        type="Password"
        placeholder="Password"
        value={password ? password : ""}
        onChange={ (val) => setPassword(val) }
      />

      <SubmitButton
        text="Log in"
        disabled={buttonDisabled}
        onClick={ () => loginUser() }
      />
    </div>
    );
}

export default LoginForm;