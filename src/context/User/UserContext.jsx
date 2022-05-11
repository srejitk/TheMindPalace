import { createContext, useContext, useReducer } from "react";
import { userReducer } from "./UserReducer";

const UserContext = createContext();

const useUserDetails = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, {
    isLogged: false,
    watchlater: [],
    history: [],
    liked: [],
    playlists: [
      {
        description: "",
        title: "egdsgsd",
        videos: [],
        _id: "bdd7cb49-c3d5-4ed0-ac48-43f68c9e98ea",
      },
    ],
  });
  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUserDetails };
