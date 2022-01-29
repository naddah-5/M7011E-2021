import { createContext } from "react";

/* Depricated class */
  const UserContext = createContext ({
        token: null,
        userId: null,
        setToken: () => {},
        setUserId: () => {}
    }); 

export default UserContext;