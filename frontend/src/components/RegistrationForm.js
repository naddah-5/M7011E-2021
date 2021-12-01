import React, {useState} from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "../stores/UserStore";

function RegistrationForm(){
    const[username, setUsername] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[birthDate, setBirthDate] = useState("");
    const[address, setAddress] = useState("");
    const[password, setPassword] = useState("");
    const[retypedPassword, setRetypedPassword] = useState("");
    const[buttonDisabled, setButtonDisabled] = useState("");

    const resetForm = () => {
        setUsername("");
        setFirstName("");
        setLastName("");
        setBirthDate("");
        setAddress("");
        setPassword("");
        setRetypedPassword("");
        setButtonDisabled(false);
    }

    const registerUser = async () => {
        if (!username) {
            resetForm();
            alert("Please enter a valid username");
            return(false);
        }
        else if (!password) {
            resetForm();
            alert("Please enter a valid password")
        }
        else if (password != retypedPassword) {
            resetForm();
            alert("Submitted passwords do not match")
            return(false);
        }
        else if(!firstName || !lastName || !address) {
            resetForm();
            alert("Incomplete personal details");
            return(false);
        }

        setButtonDisabled(true);
        try {
            // ONLY FOR TESTING!!!
            console.log("submitted username: " + username);
            console.log("submitted password: " + password);
            console.log("submitted retyped password: " + retypedPassword);
            console.log("submitted first name: " + firstName);
            console.log("submitted last name: " + lastName);
            console.log("submitted  birthdate: " + birthDate);
            console.log("submitted address: " + address);
            
            const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    query:`{
                        createUser(
                            email:"${username}",
                            password:"${password}",
                            lastname:"${lastName}",
                            birthDate:"${birthDate}",
                            address:"${address}"

                        ){
                            password
                            _id
                        }
                    }`
                })
            });
            let result = await res.json();

            if(res.status === 200) {
                console.log("Login successful");
                alert("Registration complete!");
                resetForm();
                buttonDisabled(false);

            }
        }
        catch(e) {
            console.log(e);
            resetForm();
        }
    }

    return(
        <div className="registrationForm">
            Register
            <InputField
                type="text"
                placeholder="email/username"
                value={username ? username : ""}
                onChange={ (val) => setUsername(val)}
            />

            <InputField
                type="text"
                placeholder="First name"
                value={ firstName ? firstName : ""}
                onChange={ (val) => setFirstName(val)}
            />
            <InputField
                type="text"
                placeholder="Last name"
                value={ lastName ? lastName : ""}
                onChange={ (val) => setLastName(val)}
            />
            <InputField
                type="text"
                placeholder="Date of birth"
                value={ birthDate ? birthDate : "YYMMDD"}
                onChange={ (val) => setBirthDate(val)}
            />
            <InputField
                type="text"
                placeholder="Address"
                value={ address ? address : "" }
                onChange={ (val) => setAddress(val)}

            />
            <InputField
                type="Password"
                placeholder="Password"
                value={password ? password : ""}
                onChange={ (val) => setPassword(val)}
            />
            <InputField
                type="Password"
                placeholder="Please enter password again"
                value={retypedPassword ? retypedPassword : ""}
                onChange={ (val) => setRetypedPassword(val)}
            />
            <SubmitButton
                text="Register"
                disabled={buttonDisabled}
                onClick={ () => registerUser() }
            />
        </div>
    );
}

export default RegistrationForm;