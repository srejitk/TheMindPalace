import React from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { useUserDetails } from "../../context/User/UserContext";
import styles from "./Profile.module.css";

export const Profile = () => {
  const { userState, userDispatch } = useUserDetails();
  const { history, liked, watchlater } = userState;
  const { userDetails } = useAuth();
  const { firstName, email } = userDetails;
  return (
    <div className="flex-column-wrap content default">
      <div className={styles.page_header}>
        <h1>
          Hello \\<span className={`grey_text ${styles.subtext}`}>Profile</span>
        </h1>
      </div>

      <h1 className={styles.detail_body}>Name : {firstName}</h1>

      <h1 className={styles.detail_body}>Email : {email}</h1>

      <div className={styles.page_header}>
        <h1>
          Stats \\
          <span className={`grey_text ${styles.subtext}`}>Your scores</span>
        </h1>
      </div>
      <div className={`${styles.content_wrapper}`}>
        <div className={`${styles.detail_card}`}>
          <h1 className={styles.detail_title}>
            You have liked {liked?.length === 0 ? 0 : liked?.length} videos.
          </h1>
          <h1 className={styles.detail_banner}>
            {liked?.length === 0 ? 0 : liked?.length}
          </h1>
        </div>

        <div className={`${styles.detail_card}`}>
          <h1 className={styles.detail_title}>
            You have added {watchlater?.length === 0 ? 0 : watchlater?.length}{" "}
            videos to watchlater.
          </h1>
          <h1 className={styles.detail_banner}>
            {watchlater?.length === 0 ? 0 : watchlater?.length}
          </h1>
        </div>

        <div className={`${styles.detail_card} `}>
          <h1 className={styles.detail_title}>
            You have watched {history?.length === 0 ? 0 : history?.length}{" "}
            videos.
          </h1>
          <h1 className={styles.detail_banner}>
            {history?.length === 0 ? 0 : history?.length}
          </h1>
        </div>
      </div>
    </div>
  );
};
