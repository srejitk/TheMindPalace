import React, { useState } from "react";
import { useUserDetails } from "../../context/User/UserContext";
import { Link } from "react-router-dom";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";
import styles from "./HistoryCard.module.css";
import { removeFromHistory } from "../../context/Video/HandleHistory";

export default function HistoryCard({ video }) {
  const { thumbnail, preview, title, creator, views } = video;
  const [options, setOptions] = useState(false);
  const { userState, userDispatch } = useUserDetails();
  const { watchlater } = userState;

  const optionsHandler = () => {
    setOptions((prev) => !prev);
  };

  const watchlaterHandler = (video) => {
    return watchlater?.some((item) => video._id === item._id);
  };
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
        <div
          onClick={() =>
            watchlaterHandler(video)
              ? removeFromWatchlater(video, userDispatch)
              : addToWatchlater(video, userDispatch)
          }
          className={`${styles.dialog} flex-row-nowrap`}
        >
          <span className="material-icons">watch_later</span>
          <p>
            {watchlaterHandler(video)
              ? "Del from Watch Later"
              : "Add to Watch Later"}
          </p>
        </div>
        <div
          className={`${styles.dialog} flex-row-nowrap`}
          onClick={(e) => removeFromHistory(video, userDispatch)}
        >
          <span className="material-icons">manage_history</span>
          <label htmlFor="watchlater">Remove from History</label>
        </div>
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
