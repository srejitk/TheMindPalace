import React, { useState, useEffect } from "react";
import { useUserDetails } from "../../context/User/UserContext";
import { Link } from "react-router-dom";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";
import styles from "./HorizontalVideoCard.module.css";

export default function HorizontalVideoCard({ video, children }) {
  const { thumbnail, preview, title, creator, views } = video;
  const [options, setOptions] = useState(false);
  const { userState, userDispatch } = useUserDetails();
  const { watchlater } = userState;

  const optionsHandler = () => {
    setOptions((prev) => !prev);
  };

  useEffect(() => {
    if (options) {
      setTimeout(() => setOptions((prev) => !prev), 4000);
    }
  }, [options]);

  return (
    <div className={`${styles.video_card} box-shadow position-relative`}>
      <div onClick={optionsHandler}>
        <span
          className={`position-absolute ${
            options ? styles.hideOption : styles.showOption
          } ${styles.options} material-icons`}
        >
          {options ? `close` : `more_vert`}
        </span>
      </div>

      <div
        className={`${styles.dialog_container} box-shadow ${
          options ? styles.showDialog : styles.hideDialog
        }`}
      >
        {children}
      </div>
      <Link to={`/video/${video.videoID}`}>
        <div className={`${styles.videoCover}`}>
          <img
            src={thumbnail}
            className={styles.thumbnail}
            alt="video-thumbnail"
          />

          <img src={preview} className={styles.preview} alt="video-thumbnail" />
        </div>
      </Link>
      <div className={`${styles.videoText} `}>
        <h4 className={`${styles.title} body-2`}>{title}</h4>
        <div className="flex-row-wrap flex-mid-left">
          <p className={`subtitle-2 ${styles.creator}`}>{creator}</p>
          <span className={` ${styles.verified} material-icons`}>verified</span>
        </div>

        <p className={`subtitle-2 ${styles.views} `}>{views} Views</p>
      </div>
    </div>
  );
}
