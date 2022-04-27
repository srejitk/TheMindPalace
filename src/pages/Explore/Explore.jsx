import React from "react";
import styles from "./Explore.module.css";
import { videos } from "../../backend/db/videos";

//Will call the DB with API call in the Next Branch along with other API calls

export default function Explore() {
  return (
    <div className="flex-column-wrap flex-mid-center content">
      <div className={` ${styles.pill_container} default flex-row-wrap gap20`}>
        <div className={`flex-row-wrap ${styles.pill}`}>Tech</div>
        <div className={`flex-row-wrap ${styles.pill}`}>Productivity</div>
        <div className={`flex-row-wrap ${styles.pill}`}>Self Care</div>
        <div className={`flex-row-wrap ${styles.pill}`}>Informative</div>
      </div>
      <div className={`${styles.videos_container} `}>
        {videos.map((video) => (
          <div className={`${styles.video_card} box-shadow`}>
            <div className={styles.videoCover}>
              <img
                src={video.thumbnail}
                className={styles.thumbnail}
                alt="video-thumbnail"
              />
              <img
                src={video.preview}
                className={styles.preview}
                alt="video-thumbnail"
              />
            </div>
            <div className={styles.videoText}>
              <h4 className={`${styles.title} body-2`}>{video.title}</h4>
              <div className="flex-row-wrap flex-mid-left">
                <p className="subtitle-2">{video.creator}</p>
                <span className={` ${styles.verified} material-icons`}>
                  verified
                </span>
              </div>

              <p>{video.views} Views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
