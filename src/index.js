import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, ThemeProvider, VideoProvider } from "./context";
import { UserProvider } from "./context/User/UserContext";
import { FilterProvider } from "./context/Filter/FilterContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <VideoProvider>
          <UserProvider>
            <FilterProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </FilterProvider>
          </UserProvider>
        </VideoProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
