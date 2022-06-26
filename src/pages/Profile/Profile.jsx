import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/Auth/AuthContext";
import { useUserDetails } from "../../context/User/UserContext";
import styles from "./Profile.module.css";
export const Profile = () => {
  const { userState, userDispatch } = useUserDetails();
  const { history, liked, watchlater } = userState;
  const { userDetails } = useAuth();
  const { firstName, email } = userDetails;
  const navigate = useNavigate();

  return (
    <div className="flex-column-wrap content default">
      <div className={styles.page_header}>
        <h1>Profile</h1>
        <button onClick={() => navigate("/")} className={`trash_btn`}>
          Home
          <span className="material-icons">home</span>
        </button>
      </div>
      <div className={`${styles.content_wrapper} flex-row-wrap`}>
        <div className={styles.watchlist_container}>
          <div className={`${styles.detail_card} `}>
            <h1 className={styles.detail_body}>Name : {firstName}</h1>
            <h1 className={styles.detail_body}>Email : {email}</h1>
          </div>
          <div className={`${styles.detail_card} ${styles.detail_card1} `}>
            <h1 className={styles.detail_body}>
              You have liked {liked?.length === 0 ? 0 : liked?.length} videos.
            </h1>
            <h1 className={styles.detail_title}>
              You have watched {history?.length === 0 ? 0 : history?.length}{" "}
              videos.
            </h1>
            <h1 className={styles.detail_body}>
              You have added {watchlater?.length === 0 ? 0 : watchlater?.length}{" "}
              videos to watchlater.{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
