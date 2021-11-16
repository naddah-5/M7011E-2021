import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from '../stores/UserStore';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      username: "",
      password: "",
      buttonDisabled: false 
    }
  }

  //input value from the forms
  setInputValue(property, val) {
    //remove any spaces in the input
    val = val.trim();
    //if the input is longer than 12 characters we return false, i.e. maximum password and username length
    if (val.length > 12) {
      return false;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false
    })
  }

  async loginUser() {
    //begin by checking if both input fields have been entered with valiid values

    //if no username is received return false
    if(!this.state.username) {
      return false;
    }
    //if no password is received  return false
    if(!this.state.password) {
      return false;
    }

    //disable the login button so that we don't get flood the api with loginrequests 
    this.setState({
      buttonDisabled: true
    })
    try {
      let res = await fetch("/login", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      //wait for the result to arrive
      let result = await res.json();
      
      //if the login is successful update the user store
      if(result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        UserStore.loading = false;
      }
      else if(result && result.success === false) {
        this.resetForm();
        alert(result.msg)
      }

    }
    catch(e) {
      console.log(e);
      this.resetForm();
    }
  }
  
  render () {
    return(
      <div className="loginForm">
        Log in
        <InputField
          type="text"
          placeholder="Username"
          //in my opinion it's generally bad for readability to use ternary operations but it seems like it is the only way here
          //otherwise it has to be done in conditionals outside this part
          value={this.state.username ? this.state.username : ""}
          onChange={ (val) => this.setInputValue("username", val) }
        />

        <InputField
          type="Password"
          placeholder="Password"
          //in my opinion it's generally bad for readability to use ternary operations but it seems like it is the only way here
          //otherwise it has to be done in conditionals outside this part
          value={this.state.password ? this.state.password : ""}
          onChange={ (val) => this.setInputValue("password", val) }
        />

        <SubmitButton
          text="Login"
          disabled={this.state.buttonDisabled}
          onClick={ () => this.loginUser() }
        />
      </div>
    );
  }
}

export default LoginForm;