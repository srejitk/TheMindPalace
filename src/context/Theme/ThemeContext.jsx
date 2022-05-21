import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [searchbar, setSearchbar] = useState(true);
  const [theme, setTheme] = useState(false);
  return (
    <ThemeContext.Provider value={{ searchbar, setSearchbar, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
