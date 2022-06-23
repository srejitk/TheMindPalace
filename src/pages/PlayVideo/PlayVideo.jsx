import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./PlayVideo.module.css";
import ReactPlayer from "react-player";
import { useVideo } from "../../context/Video/VideoContext";
import { Modal, VideoCard } from "../../components";
import { useUserDetails } from "../../context/User/UserContext";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";
import toast from "react-hot-toast";
import { addToHistory } from "../../context/Video/HandleHistory";
import {
  getRelated,
  getVideoData,
  watchlaterHandler,
} from "../../services/ApiCalls";

export default function PlayVideo() {
  const { videoID } = useParams();
  const {
    videoState,
    isLoading,
    dislike,
    setDislike,
    showModal,
    setShowModal,
  } = useVideo();
  const { userState, userDispatch } = useUserDetails();
  const { videolist } = videoState;

  const videoData = getVideoData(videoID, videolist);

  const related_videos = getRelated(videoData, videolist);

  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, [videoID]);

  const likeHandler = (videoData, userDispatch) => {
    const isLiked = userState?.liked?.includes(videoData);
    if (isLiked && !dislike) {
      userDispatch({ type: "UNLIKE_VIDEO", payload: videoData });
    } else if (!isLiked && !dislike) {
      userDispatch({ type: "LIKE_VIDEO", payload: videoData });
    } else if (!isLiked && dislike) {
      setDislike(false);
      userDispatch({ type: "LIKE_VIDEO", payload: videoData });
    }
  };

  const dislikeHandler = (videoData, userState, userDispatch) => {
    const isLiked = userState?.liked?.includes(videoData);
    if (isLiked && !dislike) {
      userDispatch({ type: "UNLIKE_VIDEO", payload: videoData });
      setDislike(true);
    } else if (!isLiked && !dislike) {
      setDislike(true);
    } else if (!isLiked && dislike) {
      setDislike(false);
    }
  };

  const addToHistoryHandler = () => {
    addToHistory(videoData, userDispatch);
  };

  const playlistHandler = (e) => {
    setShowModal((showModal) => !showModal);
  };

  return (
    <>
      {showModal ? (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          videoData={videoData}
        />
      ) : null}
      <div
        className={`content flex-column-wrap flex-mid-center default ${
          styles.container
        } ${showModal ? styles.blurBG : ""}`}
      >
        <div className={styles.page_header}>
          <h1>Play</h1>
          <button
            onClick={() => userDispatch({ type: "ADD_NOTE" })}
            className={`trash_btn`}
          >
            Note
            <span className="material-icons">add</span>
          </button>
        </div>
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
              onReady={addToHistoryHandler}
            />
          </div>
        </div>
        <div
          className={`flex-row-wrap flex-mid-left ${styles.option_container} `}
        >
          {" "}
          <div
            className={`flex-row-wrap bottom_border ${styles.title_container}`}
          >
            <div className="flex-row-wrap flex-top-center gap20 p1b">
              <img
                src={videoData?.channelArt}
                alt="channel logo"
                className={styles.channelLogo}
              />
              <div className="flex-column-wrap">
                <p className="header-5">{videoData?.title}</p>
                <p className="subtitle-1">{videoData?.creator}</p>
                <p className="subtitle-1 grey_text">{videoData?.views} Views</p>
                <div className="flex-row-wrap full-width gap20 flex-mid-left"></div>
              </div>
            </div>

            <div className={`flex-row-wrap ${styles.btn_container}`}>
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
                onClick={() =>
                  dislikeHandler(videoData, userState, userDispatch)
                }
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
                  watchlaterHandler(videoData, userState)
                    ? removeFromWatchlater(videoData, userDispatch)
                    : addToWatchlater(videoData, userDispatch)
                }
                className="flex-column-wrap flex-mid-center"
              >
                <button
                  className={`btn btn_action ${
                    watchlaterHandler(videoData, userState) ? styles.active : ""
                  }  `}
                >
                  <span className={`material-icons`}>watch_later</span>
                </button>
                <p className="subtitle-1">Watch Later</p>
              </div>
              <div
                onClick={(e) => playlistHandler(e)}
                className="flex-column-wrap flex-mid-center"
              >
                <button
                  className={`btn btn_action ${
                    watchlaterHandler(videoData) ? styles.active : ""
                  }  `}
                >
                  <span className={`material-icons`}>playlist_add_circle</span>
                </button>
                <p className="subtitle-1">Add To Playlist</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.page_header}>
          <h1>
            Related |<span className={`grey_text ${styles.subtext}`}>More</span>
          </h1>
          <Link to="/">
            <button className={`trash_btn`}>
              All
              <span className="material-icons">arrow_forward</span>
            </button>
          </Link>
        </div>
        <div
          className={` flex-mid-center flex-column-wrap ${styles.related_section}`}
        >
          {related_videos?.map((video) => (
            <VideoCard key={video._id} video={video} mini={true}>
              <div
                onClick={() =>
                  watchlaterHandler(video, userState)
                    ? removeFromWatchlater(video, userDispatch)
                    : addToWatchlater(video, userDispatch)
                }
                className={`${styles.dialog} flex-row-nowrap`}
              >
                <span className="material-icons">watch_later</span>
                <p>
                  {watchlaterHandler(video, userState)
                    ? "Delete from Watch Later"
                    : "Add to Watch Later"}
                </p>
              </div>
              <div
                onClick={() => likeHandler(video, userDispatch, userState)}
                className={`${styles.dialog} flex-row-nowrap`}
              >
                <span className="material-icons">thumb_up</span>
                <p>Add to Liked</p>
              </div>
            </VideoCard>
          ))}
        </div>
      </div>
    </>
  );
}
