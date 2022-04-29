import React, { useState } from "react";
import styles from "./Explore.module.css";
import { videos } from "../../backend/db/videos";
import { VideoCard } from "../../components";
import { useVideo } from "../../context/Video/VideoContext";

export default function Explore() {
  const { videoState } = useVideo();
  const { videolist } = videoState;
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
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
