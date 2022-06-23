import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext";
import { useTheme } from "../../context/Theme/ThemeContext";
import { useVideo } from "../../context/Video/VideoContext";
import { useState } from "react";

export default function Header() {
  const { isLogged, logoutHandler } = useAuth();
  const { videoDispatch, filteredVideos } = useVideo();
  const [showSearch, setShowSearch] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const { theme, setTheme } = useTheme();

  const handleTheme = (e) => {
    setTheme(!theme);
  };

  useEffect(() => {
    if (showOptions) {
      setTimeout(() => setShowOptions(false), 4000);
    }

    return clearTimeout();
  }, [showOptions]);

  return (
    <div className={`flex-row-wrap position-relative ${styles.Navbar}`}>
      <div className={`flex-row-wrap gap20 ${styles.Navbar_brand}`}>
        <Link to="/" className={`flex-row-wrap gap20 ${styles.Navbar_brand}`}>
          <div className={`flex-mid-center ${styles.logo_container}`}>
            <img
              className={styles.logo}
              src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1652438526/TheMindPalace/Creator/Cinema_Ticket_ulbniu.png"
              alt="MindPalace Logo"
            />
          </div>
          <h5 className={`header-5 ${styles.hero}`}>
            The <span className={`brand-color`}>Mind</span>Palace
          </h5>
        </Link>
      </div>
      <div className={`position-relative ${styles.search_bar_wrapper}`}>
        <input
          type="text"
          placeholder="Search..."
          className={`${styles.search_bar}  ${
            showSearch ? styles.showSearch : null
          }`}
          onChange={(e) =>
            videoDispatch({ type: "SET_SEARCH", payload: e.target.value })
          }
        />
        {
          <div className={styles.search_results}>
            {filteredVideos?.slice(-5)?.map((video) => {
              return (
                <Link
                  to={`/video/${video?.videoID}`}
                  key={video?.id}
                  className={`flex flex-row-wrap ${styles.search_result_card}`}
                >
                  <span className="material-icons">search</span>
                  <p className="body-1">{video.title}</p>
                </Link>
              );
            })}
          </div>
        }
      </div>

      <div
        className={`flex-row-wrap flex-mid-center margin-left relative ${styles.btn_wrapper}`}
      >
        <button onClick={(e) => handleTheme(e)} className="btn btn_action ">
          <span className="material-icons">
            {theme ? `light_mode` : `dark_mode`}
          </span>
        </button>

        <button
          onClick={(e) => setShowOptions((prev) => !prev)}
          className="btn btn_action"
        >
          <span className="material-icons">person</span>
        </button>
        <div
          className={`flex-column-wrap box-shadow ${
            showOptions ? styles.showOptions : null
          } ${styles.userOptions}`}
        >
          <div
            className={`${styles.links} full-width flex-column-wrap flex-mid-center`}
          >
            {isLogged ? (
              <>
                <Link
                  to="/profile"
                  className={`${styles.link} ${
                    showOptions ? styles.showOption : null
                  } subtitle-1`}
                >
                  <span className="material-icons">person</span>
                  Profile
                </Link>
                <Link
                  to="/"
                  onClick={logoutHandler}
                  className={`${styles.link} ${
                    showOptions ? styles.showOption : null
                  } subtitle-1`}
                >
                  <span className="material-icons">logout</span>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={` ${styles.link} ${
                    showOptions ? styles.showOption : null
                  }  subtitle-1`}
                >
                  {" "}
                  <span className="material-icons">login</span>
                  Sign In
                </Link>
                <Link
                  to="signup"
                  className={`${styles.link}  ${
                    showOptions ? styles.showOption : null
                  }subtitle-1`}
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
