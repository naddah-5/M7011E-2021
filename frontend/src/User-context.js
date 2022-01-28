import { createContext } from "react";

  const UserContext = createContext ({
        token: null,
        userId: null,
        setToken: () => {},
        setUserId: () => {}
    }); 

export default UserContext;