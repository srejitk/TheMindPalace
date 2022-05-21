import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useTheme } from "../../context/Theme/ThemeContext";
import { useVideo } from "../../context/Video/VideoContext";
import { useState } from "react";

export default function Header() {
  const { isLogged, logoutHandler } = useAuth();
  const { videoDispatch } = useVideo();
  const [showSearch, setShowSearch] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const { theme, setTheme } = useTheme();

  const handleTheme = (e) => {
    setTheme(!theme);
  };

  useEffect(() => {
    if (showOptions) {
      setTimeout(() => setShowOptions((prev) => !prev), 4000);
    }
  }, [showOptions]);

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => setShowSearch((prev) => !prev), 5000);
    }
  }, [showSearch]);

  return (
    <div className={`flex-row-wrap position-relative ${styles.Navbar}`}>
      <div className={`flex-row-wrap gap20 ${styles.Navbar_brand}`}>
        <Link to="/" className={`flex-row-wrap gap20 ${styles.Navbar_brand}`}>
          <div className={`flex-mid-center ${styles.logo_container}`}>
            <img
              className={styles.logo}
              src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1652438526/TheMindPalace/Creator/Cinema_Ticket_ulbniu.png"
              alt="BrainDump Logo"
            />
          </div>
          <h5 className={`header-5 ${styles.hero}`}>
            The <span className={`brand-color`}>Mind</span>Palace
          </h5>
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className={`${styles.search_bar} ${
          showSearch ? styles.showSearch : null
        }`}
        onChange={(e) =>
          videoDispatch({ type: "SET_SEARCH", payload: e.target.value })
        }
      />

      <div
        className={`flex-row-wrap flex-mid-center margin-left relative ${styles.btn_wrapper}`}
      >
        <button
          onClick={(e) => setShowSearch((prev) => !prev)}
          className={`${styles.searchIcon} btn btn_action `}
        >
          <span className={` material-icons`}>
            {showSearch ? "close" : "search"}
          </span>
        </button>
        <button onClick={(e) => handleTheme(e)} className="btn btn_action ">
          <span className="material-icons">
            {theme ? `light_mode` : `dark_mode`}
          </span>
        </button>

        <button
          onClick={(e) => setShowOptions((prev) => !prev)}
          className="btn btn_action"
        >
          <span className="material-icons">person_pin</span>
        </button>
        <div
          className={`flex-column-wrap box-shadow ${
            showOptions ? styles.showOptions : null
          } ${styles.userOptions}`}
        >
          <div
            className={`${styles.links} full-width flex-column-wrap flex-mid-center`}
          >
            <Link
              to="/profile"
              className={`${styles.link} ${
                showOptions ? styles.showOption : null
              } btn btn_action subtitle-1`}
            >
              <span className="material-icons">person</span>
              Profile
            </Link>
            {isLogged ? (
              <Link
                to="/"
                onClick={logoutHandler}
                className={`${styles.link} ${
                  showOptions ? styles.showOption : null
                } btn btn_action subtitle-1`}
              >
                <span className="material-icons">logout</span>
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className={` ${styles.link} ${
                    showOptions ? styles.showOption : null
                  }  btn btn_action subtitle-1`}
                >
                  {" "}
                  <span className="material-icons">login</span>
                  Sign In
                </Link>
                <Link
                  to="signup"
                  className={`${styles.link}  ${
                    showOptions ? styles.showOption : null
                  } btn btn_action subtitle-1`}
                >
                  {" "}
                  <span className="material-icons">person_add_alt</span>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
