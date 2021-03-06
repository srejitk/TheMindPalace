2;
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "Damon Salvatore",
    email: "damonSalvatore@gmail.com",
  });
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLogged(true);
    }
  }, [isLogged]);

  const logoutHandler = () => {
    localStorage.removeItem("Token");
    setIsLogged(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        logoutHandler,
        isLogged,
        setIsLogged,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
