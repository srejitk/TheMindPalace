import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./VideoCard.module.css";

export default function VideoCard({ video, mini, children }) {
  const { thumbnail, preview, title, creator, views } = video;
  const [options, setOptions] = useState(false);

  const optionsHandler = () => {
    setOptions((prev) => !prev);
  };

  useEffect(() => {
    if (options) {
      setTimeout(() => setOptions(false), 4000);
    }

    return clearTimeout();
  }, [options]);

  return (
    <div
      className={`${styles.video_card} ${
        mini ? styles.mini : ""
      } box-shadow position-relative`}
    >
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
        className={`${styles.dialog_container} ${
          mini ? styles.miniDialog : ""
        } box-shadow ${options ? styles.showDialog : styles.hideDialog}`}
      >
        {children}
      </div>
      <Link to={`/video/${video.videoID}`}>
        <div className={styles.videoCover}>
          <img
            src={thumbnail}
            className={styles.thumbnail}
            alt="video-thumbnail"
          />

          <img src={preview} className={styles.preview} alt="video-thumbnail" />
        </div>
      </Link>
      <Link to={`/video/${video.videoID}`}>
        <div className={styles.videoText}>
          <h4 className={`${styles.title} body-1`}>{title}</h4>
          <div className="flex-row-wrap flex-mid-left">
            <p className="body-2">{creator}</p>
            <span className={` ${styles.verified} material-icons`}>
              verified
            </span>
          </div>

          <p className="body-2">{views} Views</p>
        </div>
      </Link>
    </div>
  );
}
