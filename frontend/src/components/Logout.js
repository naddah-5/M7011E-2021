//react is NOT unused, it is required for babel
import react from         "react";
import UserStore from     '../stores/UserStore';

function LogoutUser(props) {
  try {

    UserStore.loading = true;
    UserStore.username = "";
    UserStore.userId = "";
    UserStore.authToken = "";
    UserStore.isLoggedIn = false;
    UserStore.loading = false;
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    }

    catch(e) {
    console.log(e);
  }
}

export default LogoutUser