import { ToastContainer } from "react-toastify";
import "./App.css";
import { Header, Sidebar } from "./components";
import { useTheme } from "./context/Theme/ThemeContext";
import logo from "./logo.png";
import Router from "./utils/Router";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App ${theme ? "dark-mode" : "light-mode"}`}>
      <Header />
      <Router />
      <Sidebar />
      <ToastContainer />
    </div>
  );
}

export default App;
