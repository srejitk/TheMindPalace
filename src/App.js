import { ToastContainer } from "react-toastify";
import "./App.css";
import logo from "./logo.png";
import Router from "./utils/Router";

function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
