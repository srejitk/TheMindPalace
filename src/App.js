import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router";
import "./App.css";
import { Header, Sidebar } from "./components";
import { useTheme } from "./context/Theme/ThemeContext";

import Router from "./utils/Router";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, []);

  const { pathname } = useLocation();

  console.log(pathname);
  return (
    <div className={`App ${theme ? "dark-mode" : "light-mode"}`}>
      <Header />
      <Router />
      {pathname === "/login" || pathname === "/signup" ? null : <Sidebar />}
      <Toaster />
    </div>
  );
}

export default App;
