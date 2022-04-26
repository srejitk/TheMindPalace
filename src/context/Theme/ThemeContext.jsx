import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [theme, setTheme] = useState(false);
  return (
    <ThemeContext.Provider value={{ sidebar, setSidebar, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
