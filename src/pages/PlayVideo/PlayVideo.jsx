import React from "react";
import { useParams } from "react-router";
import styles from "./PlayVideo.module.css";
import ReactPlayer from "react-player";
import { useVideo } from "../../context/Video/VideoContext";
import { useEffect, useState } from "react";
import { ActionBtn, VideoCard } from "../../components";
import { useUserDetails } from "../../context/User/UserContext";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";
import toast from "react-hot-toast";

export default function PlayVideo() {
  const { videoID } = useParams();
  const { videoState } = useVideo();
  const { userState, userDispatch } = useUserDetails();
  const { videolist } = videoState;
  const [dislike, setDislike] = useState(false);

  const getVideoData = (videoID, videolist) =>
    videolist?.find((video) => video.videoID === videoID);

  const videoData = getVideoData(videoID, videolist);

  const getRelated = (videoData, videolist) =>
    videolist?.filter((video) => video.category === videoData.category);

  const related_videos = getRelated(videoData, videolist);

  const likeHandler = (videoData, userDispatch) => {
    if (dislike) {
      setDislike(() => !dislike);
    }

    userDispatch({ type: "LIKE_VIDEO", payload: videoData });
    toast("Liked!", {
      icon: "❤️",
    });
  };

  const dislikeHandler = (videoData) => {
    if (userState.liked?.includes(videoData)) {
      userDispatch({ type: "LIKE_VIDEO", payload: videoData });
    }
    setDislike(() => !dislike);
    toast("Disliked", {
      icon: "💔",
    });
  };

  const watchlaterHandler = (video) => {
    return userState.watchlater?.some((item) => video._id === item._id);
  };

  return (
    <div
      className={`content flex-row-wrap flex-mid-center default ${styles.container}`}
    >
      <div
        className={`${styles.videoSection} flex-column-wrap flex-mid-center`}
      >
        <div className={styles.player}>
          <ReactPlayer
            url={`http://www.youtube.com/watch?v=${videoID}`}
            controls={true}
            className={styles.video}
            width="100%"
            height="100%"
          />
        </div>

        <div
          className={`flex-row-wrap flex-mid-left ${styles.option_container} `}
        >
          {" "}
          <div
            className={`flex-column-wrap bottom_border ${styles.title_container}`}
          >
            <p className="header-6">{videoData?.title}</p>
            <p className="body-2 grey_text">{videoData?.views} Views</p>
          </div>
          <div
            className={`flex-row-wrap bottom_border  ${styles.btn_container}`}
          >
            <div
              onClick={() => likeHandler(videoData, userDispatch)}
              className="flex-column-wrap flex-mid-center"
            >
              <button
                className={`btn btn_action  ${
                  userState.liked?.includes(videoData) ? styles.active : ""
                }`}
              >
                <span className={`material-icons`}>thumb_up</span>
              </button>
              <p className="subtitle-1">Like</p>
            </div>
            <div
              onClick={() => dislikeHandler(videoData)}
              className="flex-column-wrap flex-mid-center"
            >
              <button
                className={`btn btn_action  ${dislike ? styles.active : ""}`}
              >
                <span className={`material-icons`}>thumb_down</span>
              </button>
              <p className="subtitle-1">Dislike</p>
            </div>
            <div
              onClick={() =>
                watchlaterHandler(videoData)
                  ? removeFromWatchlater(videoData, userDispatch)
                  : addToWatchlater(videoData, userDispatch)
              }
              className="flex-column-wrap flex-mid-center"
            >
              <button
                className={`btn btn_action ${
                  watchlaterHandler(videoData) ? styles.active : ""
                }  `}
              >
                <span className={`material-icons`}>watch_later</span>
              </button>
              <p className="subtitle-1">Watch Later</p>
            </div>
            {/* <div
              onClick={() => addToWatchlater(videoData, videoDispatch)}
              className="flex-column-wrap flex-mid-center"
            >
              <button className={`btn btn_action  `}>
                <span className={`material-icons`}>playlist_add</span>
              </button>
              <p className="subtitle-1">Watch Later</p>
            </div> */}
          </div>
          <div className="flex-row-wrap p1side gap20 flex-mid-left">
            <img
              src={videoData?.channelArt}
              alt="channel logo"
              className={styles.channelLogo}
            />
            <p className="subtitle-1">{videoData?.creator}</p>
          </div>
        </div>
      </div>
      <div className={styles.related_section}>
        <div className={`${styles.note_container} box-shadow`}>
          <input
            type="text"
            placeholder="Title"
            className={styles.title_input}
          />
          <input
            type="text"
            className={styles.body_input}
            placeholder="Create a note..."
          />
        </div>
        <div className={styles.suggested_container}>
          <h5 className="subtitle-1 m1t">RELATED VIDEOS</h5>
          <div
            className={` flex-mid-center flex-column-wrap ${styles.related_videos}`}
          >
            {related_videos?.map((video) => (
              <VideoCard key={video._id} video={video} mini={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}