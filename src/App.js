import { Toaster } from "react-hot-toast";
import "./App.css";
import { Header, Sidebar } from "./components";
import { useTheme } from "./context/Theme/ThemeContext";

import Router from "./utils/Router";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App ${theme ? "dark-mode" : "light-mode"}`}>
      <Header />
      <Router />
      <Sidebar />
      <Toaster />
    </div>
  );
}

export default App;
