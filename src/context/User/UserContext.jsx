import { createContext, useContext, useReducer } from "react";
import { userReducer } from "./UserReducer";

const UserContext = createContext();

const useUserDetails = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, {
    isLogged: false,
    watchlater: [],
  });
  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserDetails };
