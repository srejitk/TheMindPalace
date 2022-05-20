import React from "react";
import styles from "./History.module.css";
import HorizontalVideoCard from "../../components/HorizontalVideoCard/HorizontalVideoCard";
import { useUserDetails } from "../../context/User/UserContext";
import { likeHandler } from "../../services/ApiCalls";
import {
  clearHistory,
  removeFromHistory,
} from "../../context/Video/HandleHistory";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";

export default function Watchlist() {
  const { userState, userDispatch } = useUserDetails();
  const { watchlater, liked, history } = userState;
  const watchlaterHandler = (video) => {
    return watchlater?.some((item) => video._id === item._id);
  };
  return (
    <div className="flex-column-wrap content default">
      <div className={styles.page_header}>
        <h1>
          History |
          <span className={`grey_text ${styles.subtext}`}>
            Videos you watched
          </span>
        </h1>
        <button
          onClick={() => clearHistory(userDispatch)}
          className={`trash_btn`}
        >
          Clear
          <span className="material-icons">delete</span>
        </button>
      </div>
      <div
        className={`${styles.content_wrapper} ${
          history?.length === 0 ? styles.emptyTitle : null
        } flex-row-wrap`}
      >
        <div className={styles.watchlist_container}>
          {userState.history?.map((video) => (
            <HorizontalVideoCard key={video._id} video={video}>
              <div
                className={`${styles.dialog} flex-row-nowrap`}
                onClick={(e) => removeFromHistory(video, userDispatch)}
              >
                <span className="material-icons">manage_history</span>
                <label htmlFor="watchlater">Remove from History</label>
              </div>
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
                  {liked?.includes(video) ? "thumb_down" : "thumb_up"}
                </span>
                <p>
                  {liked?.includes(video)
                    ? "Remove from liked"
                    : "Add to liked"}
                </p>
              </div>
            </HorizontalVideoCard>
          ))}
        </div>
        <div
          className={`${styles.detail_card} ${
            history?.length === 0 ? styles.expandbanner : null
          }`}
        >
          <h1 className={styles.detail_title}>
            You have watched {history?.length === 0 ? 0 : history?.length}{" "}
            videos.
          </h1>
          <h1 className={styles.detail_banner}>
            {history?.length === 0 ? 0 : history?.length}
          </h1>
        </div>
      </div>
    </div>
  );
}
