import React from "react";
import { useNavigate, useParams } from "react-router";
import { useUserDetails } from "../../context/User/UserContext";
import styles from "./SinglePlaylist.module.css";
import HorizontalVideoCard from "../../components/HorizontalVideoCard/HorizontalVideoCard";
import {
  deleteFromPlaylist,
  deletePlaylist,
} from "../../context/Video/HandlePlaylist";
import { likeHandler } from "../../services/ApiCalls";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";
export default function SinglePlaylist() {
  const { userState, userDispatch } = useUserDetails();
  const { playlists, watchlater } = userState;
  const { playlistID } = useParams();
  const navigate = useNavigate();
  const findPlaylist = playlists?.find((item) => item._id === playlistID);
  const watchlaterHandler = (video) => {
    return watchlater?.some((item) => video._id === item._id);
  };

  const deleteHandler = (findPlaylist, userDispatch) => {
    deletePlaylist(findPlaylist, userDispatch);
    navigate("/playlist");
  };

  return (
    <div className="flex-column-wrap content default">
      <div className={styles.page_header}>
        <h1>
          {findPlaylist?.title} |
          <span className={`grey_text ${styles.subtext}`}>
            Videos you curated
          </span>
        </h1>
        <button
          onClick={() => deleteHandler(findPlaylist, userDispatch)}
          className={`trash_btn`}
        >
          Clear
          <span className="material-icons">delete</span>
        </button>
      </div>
      <div
        className={`${styles.content_wrapper} ${
          findPlaylist?.videos?.length === 0 ? styles.emptyTitle : null
        } flex-row-wrap`}
      >
        <div className={styles.watchlist_container}>
          {findPlaylist?.videos?.map((video) => (
            <HorizontalVideoCard key={video._id} video={video}>
              <div
                onClick={() =>
                  deleteFromPlaylist(findPlaylist, video, userDispatch)
                }
                className={`${styles.dialog} flex-row-nowrap`}
              >
                <span className="material-icons">watch_later</span>
                <p>Delete from playlist</p>
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
            findPlaylist?.videos?.length === 0 ? styles.expandbanner : null
          }`}
        >
          <h1 className={styles.detail_title}>
            You have added{" "}
            {findPlaylist?.videos?.length === 0
              ? 0
              : findPlaylist?.videos?.length}{" "}
            videos.
          </h1>
          <h1 className={styles.detail_banner}>
            {findPlaylist?.videos?.length === 0
              ? 0
              : findPlaylist?.videos?.length}
          </h1>
        </div>
      </div>
    </div>
  );
}
