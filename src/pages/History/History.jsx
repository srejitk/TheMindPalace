import React from "react";
import styles from "./History.module.css";
import { useUserDetails } from "../../context/User/UserContext";
import { HistoryCard } from "../../components";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";
import { removeFromHistory } from "../../context/Video/HandleHistory";

export default function History() {
  const { userState, userDispatch } = useUserDetails();
  const { watchlater } = userState;

  const watchlaterHandler = (video) => {
    return watchlater?.some((item) => video._id === item._id);
  };
  return (
    <div className="flex-column-wrap content default">
      <div className={styles.page_header}>
        <h1>History</h1>
        <button
          // onClick={() => deleteHis(playlistID, userState)}
          className={`${styles.trash_btn} btn btn_action`}
        >
          <span className="material-icons">delete</span>
        </button>
        <h4 className="subtitle-1">
          {/* Total Videos :{" "}
          {findPlaylist.videos?.length ? findPlaylist.videos?.length : 0} */}
        </h4>
      </div>
      <div className={styles.watchlist_container}>
        <div className="flex-mid-center flex-column-wrap">
          <img
            className={`${styles.emptyImage} ${
              userState.history?.length === 0 ? styles.emptyImage : styles.hide
            }`}
            src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1651220437/TheMindPalace/Empty-cuate_tqyt8f.svg"
          />
          <h5
            className={` header-6 ${
              userState.history?.length === 0 ? styles.emptyTitle : styles.hide
            }`}
          >
            A bit quiet here innit??
          </h5>
        </div>

        {userState.history?.map((video) => (
          <HistoryCard key={video._id} video={video}>
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
          </HistoryCard>
        ))}
      </div>
    </div>
  );
}
