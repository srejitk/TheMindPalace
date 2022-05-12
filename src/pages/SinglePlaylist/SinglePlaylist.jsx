import React from "react";
import { useParams } from "react-router";
import { useUserDetails } from "../../context/User/UserContext";
import styles from "./SinglePlaylist.module.css";
import HorizontalVideoCard from "../../components/HorizontalVideoCard/HorizontalVideoCard";
import {
  deleteFromPlaylist,
  deletePlaylist,
} from "../../context/Video/HandlePlaylist";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";
export default function SinglePlaylist() {
  const { userState, userDispatch } = useUserDetails();
  const { playlists, watchlater } = userState;
  const { playlistID } = useParams();
  const findPlaylist = playlists?.find((item) => item._id === playlistID);
  const watchlaterHandler = (video) => {
    return watchlater?.some((item) => video._id === item._id);
  };
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.page_header}>
        <h1>{findPlaylist?.title}</h1>
        <button
          onClick={() => deletePlaylist(playlistID, userState)}
          className={`${styles.trash_btn} btn btn_action`}
        >
          <span className="material-icons">delete</span>
        </button>
        <h4 className="subtitle-1">
          Total Videos :{" "}
          {findPlaylist.videos?.length ? findPlaylist.videos?.length : 0}
        </h4>
      </div>

      <div className={styles.page_content}>
        {findPlaylist.videos?.map((video) => (
          <HorizontalVideoCard video={video} key={video._id}>
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
              onClick={() => deleteFromPlaylist(video, userDispatch)}
              className={`${styles.dialog} flex-row-nowrap`}
            >
              <span className="material-icons">playlist_remove</span>
              <p>Remove from Watch Later</p>
            </div>
          </HorizontalVideoCard>
        ))}
      </div>
    </div>
  );
}
