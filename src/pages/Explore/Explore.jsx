import React, { useState } from "react";
import styles from "./Explore.module.css";
import { VideoCard } from "../../components";
import { useVideo } from "../../context/Video/VideoContext";
import { Link } from "react-router-dom";
import { useUserDetails } from "../../context/User/UserContext";

export default function Explore() {
  const { videoState } = useVideo();
  const { videolist } = videoState;
  const { userState, userDispatch } = useUserDetails();
  const { watchlater } = userState;
  const watchlaterHandler = (video) => {
    return watchlater?.some((item) => video._id === item._id);
  };
  return (
    <div className="flex-column-wrap flex-mid-center content">
      <div className={` ${styles.pill_container} default flex-row-wrap gap20`}>
        <div className={`flex-row-wrap ${styles.pill}`}>Tech</div>
        <div className={`flex-row-wrap ${styles.pill}`}>Productivity</div>
        <div className={`flex-row-wrap ${styles.pill}`}>Self Care</div>
        <div className={`flex-row-wrap ${styles.pill}`}>Informative</div>
      </div>
      <div className={`${styles.videos_container} `}>
        {videolist?.map((video) => (
          <VideoCard key={video._id} video={video} videoID={video.videoID}>
            {" "}
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
            <div className={`${styles.dialog} flex-row-nowrap`}>
              <span className="material-icons">playlist_add</span>
              <label htmlFor="watchlater">Add to Playlist</label>
              <input id="watchlater" type="checkbox" />
            </div>
          </VideoCard>
        ))}
      </div>
    </div>
  );
}
