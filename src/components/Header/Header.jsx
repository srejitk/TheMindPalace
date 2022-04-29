import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useTheme } from "../../context/Theme/ThemeContext";

export default function Header() {
  const { isLogged, logoutHandler } = useAuth();

  const { sidebar, setSidebar, theme, setTheme } = useTheme();

  const handleSidebar = (e) => {
    setSidebar((prev) => !prev);
  };

  const handleTheme = (e) => {
    setTheme(!theme);
  };

  return (
    <div className={`flex-row-wrap position-relative ${styles.Navbar}`}>
      <div className={`flex-row-wrap gap20 ${styles.Navbar_brand}`}>
        <button onClick={(e) => handleSidebar(e)} className="btn btn_action ">
          <span className="material-icons">{sidebar ? `close` : `menu`}</span>
        </button>

        <Link to="/" className={`flex-row-wrap gap20 ${styles.Navbar_brand}`}>
          <div className={`flex-mid-center ${styles.logo_container}`}>
            <img
              className={styles.logo}
              src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1649100763/Brain%20Dump/Brain_dlnboa.svg"
              alt="BrainDump Logo"
            />
          </div>
          <h5 className="header-5">The Mind Palace</h5>
        </Link>
      </div>

      {isLogged ? (
        <div className={`flex-row-wrap flex-mid-center gap20`}>
          <Link
            to="/"
            onClick={logoutHandler}
            className="links  btn btn_action subtitle-1"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className={`flex-row-wrap flex-mid-center gap20`}>
          <Link to="/login" className="links btn btn_action subtitle-1">
            Sign In
          </Link>
          <Link to="sign-up" className="links btn btn_action subtitle-1">
            Sign Up
          </Link>
        </div>
      )}
      <button onClick={(e) => handleTheme(e)} className="btn btn_action ">
        <span className="material-icons">
          {theme ? `light_mode` : `dark_mode`}
        </span>
      </button>
    </div>
  );
}
