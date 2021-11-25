//react is NOT unused, it is required for babel
import react from         "react";
import UserStore from     '../stores/UserStore';

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