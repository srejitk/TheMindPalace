import React from "react";
import styles from "./Liked.module.css";
import HorizontalVideoCard from "../../components/HorizontalVideoCard/HorizontalVideoCard";
import { useUserDetails } from "../../context/User/UserContext";
import { likeHandler } from "../../services/ApiCalls";

export default function Liked() {
  const { userState, userDispatch } = useUserDetails();
  const { watchlater } = userState;
  const watchlaterHandler = (video) => {
    return watchlater?.some((item) => video._id === item._id);
  };
  return (
    <div className="flex-column-wrap content default">
      <div className={styles.page_header}>
        <h1>
          Liked |
          <span className={`grey_text ${styles.subtext}`}>
            All your liked videos
          </span>
        </h1>
        <button
          onClick={() => userDispatch({ type: "CLEAR_ALL_LIKES" })}
          className={`trash_btn`}
        >
          Clear
          <span className="material-icons">delete</span>
        </button>
      </div>
      <div
        className={`${styles.content_wrapper} ${
          userState.liked?.length === 0 ? styles.emptyTitle : null
        } flex-row-wrap`}
      >
        <div className={styles.watchlist_container}>
          {userState.liked?.map((video) => (
            <HorizontalVideoCard key={video._id} video={video}>
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
                <span className="material-icons">
                  {userState?.liked?.includes(video)
                    ? "thumb_down"
                    : "thumb_up"}
                </span>
                <p>
                  {userState?.liked?.includes(video)
                    ? "Remove from liked"
                    : "Add to liked"}
                </p>
              </div>
            </HorizontalVideoCard>
          ))}
        </div>
        <div
          className={`${styles.detail_card} ${
            userState.liked?.length === 0 ? styles.expandbanner : null
          }`}
        >
          <h1 className={styles.detail_title}>
            You have liked{" "}
            {userState.liked?.length === 0 ? 0 : userState.liked?.length}{" "}
            videos.
          </h1>
          <h1 className={styles.detail_banner}>
            {userState.liked?.length === 0 ? 0 : userState.liked?.length}
          </h1>
        </div>
      </div>
    </div>
  );
}
