import styles from "./Explore.module.css";
import { CategoryChips, Loader, Modal, VideoCard } from "../../components";
import { useVideo } from "../../context/Video/VideoContext";
import { useUserDetails } from "../../context/User/UserContext";
import { likeHandler, watchlaterHandler } from "../../services/ApiCalls";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Explore() {
  const { filteredVideos, isLoading } = useVideo();
  const { userState, userDispatch } = useUserDetails();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const randomVideo =
    filteredVideos &&
    filteredVideos[Math.floor(Math.random() * filteredVideos?.length)];

  return isLoading ? (
    <Loader />
  ) : (
    <div
      className={`${styles.openSesame} flex-column-wrap flex-mid-center content`}
    >
      <div className={styles.page_header}>
        <h1>Explore</h1>
        <button
          onClick={() => navigate(`/video/${randomVideo?.videoID}`)}
          className={`trash_btn`}
        >
          Random
          <span className="material-icons">shuffle</span>
        </button>
      </div>
      <CategoryChips />
      {filteredVideos?.length === 0 ? (
        <div className={styles.no_search_result}>
          <img
            src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1656265830/TheMindPalace/Questions-bro_aa1yfp.png"
            alt="No search result found"
          />
          <p className="subtitle-1">No results found.</p>
          <p className="subtitle-2 brand-color">Try searching something else</p>
        </div>
      ) : (
        <div className={`${styles.videos_container} `}>
          {filteredVideos?.map((video) => (
            <VideoCard key={video._id} video={video} videoID={video.videoID}>
              {" "}
              <div
                onClick={() => {
                  if (localStorage.getItem("Token")) {
                    watchlaterHandler(video, userState)
                      ? removeFromWatchlater(video, userDispatch)
                      : addToWatchlater(video, userDispatch);
                  } else {
                    toast("Please login to continue", {
                      icon: "🚫",
                    });
                  }
                }}
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
                <span className="material-icons">
                  {userState?.liked?.includes(video)
                    ? "thumb_down"
                    : "thumb_up"}
                </span>
                <p>
                  {userState?.liked?.includes(video)
                    ? "Remove from liked"
                    : "Add to Liked"}
                </p>
              </div>
              <div
                onClick={() => {
                  if (localStorage.getItem("Token")) {
                    setShowModal(true);
                  } else {
                    toast("Please login to continue", {
                      icon: "🚫",
                    });
                  }
                }}
                className={`${styles.dialog} flex-row-nowrap`}
              >
                <span className="material-icons">add</span>
                <p>Add to Playlist</p>
              </div>
              {showModal && (
                <Modal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  videoData={video}
                />
              )}
            </VideoCard>
          ))}
        </div>
      )}
    </div>
  );
}
