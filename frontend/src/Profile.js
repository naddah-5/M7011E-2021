import { useState, useEffect, Fragment } from "react";

function Profile () {

    const [userData, setUserData] = useState([]);

    useEffect(async () => {

        try {
            const response = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem('token')
                },
                body:JSON.stringify({
                  query:`{
                    getUser(getUser: {
                        userId: "${localStorage.getItem('userId')}"
                    }) {
                      email
                      firstName
                      lastName
                      birthDate
                      address
                      picture
                    }}`
            })
          });
        
          let userResult = await response.json();
          setUserData(userResult.data.getUser);

          }
          catch(e) {
            console.log(e);
          } 
    }, []);

    return (
            <Fragment>
            <div className="event-list">
                <h2>User information</h2>
                    <div className="event-view">
                        <h1>Email</h1>
                        <h2>{userData.email}</h2>
                        <h1>FirstName</h1>
                        <h2>{userData.firstName}</h2>
                        <h1>LastName</h1>
                        <h2>{userData.lastName}</h2>
                        <h1>Birthdate</h1>
                        <h2>{userData.birthDate}</h2>
                        <h1>Address</h1>
                        <h2>{userData.address}</h2>

                    </div> 
            </div>
            </Fragment>
    );
}
 
export default Profile;