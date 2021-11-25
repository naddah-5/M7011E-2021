import react from "react";




function LogoutUser() {
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
  }

  export default LogoutUser