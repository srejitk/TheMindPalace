import React from "react";
import styles from "./Playlist.module.css";
import { useUserDetails } from "../../context/User/UserContext";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const { userState, userDispatch } = useUserDetails();
  const { playlists } = userState;

  return (
    <div className="flex-column-wrap content default">
      <div className={styles.page_header}>
        <h1>
          Playlists |
          <span className={`grey_text ${styles.subtext}`}>Your curations</span>
        </h1>
        <button
          onClick={() => userDispatch({ type: "CLEAR_ALL_PLAYLIST" })}
          className={`trash_btn`}
        >
          Clear
          <span className="material-icons">delete</span>
        </button>
      </div>
      <div
        className={`${styles.content_wrapper} ${
          playlists?.length === 0 ? styles.emptyTitle : null
        } flex-row-wrap`}
      >
        <div className={styles.watchlist_container}>
          {playlists?.map((playlist) => (
            <Link
              to={`/playlist/${playlist._id}`}
              className="full-width"
              key={playlist._id}
            >
              <div className={`box-shadow  relative ${styles.playlist_card}`}>
                <div className={styles.card_cover}></div>
                {playlist?.videos?.length >= 1 ? (
                  <div className={styles.thumb_wrapper}>
                    <img
                      src={playlist?.videos[0].thumbnail}
                      className={styles.card_thumb}
                    />
                  </div>
                ) : (
                  <div className={`${styles.dummy_text} flex-mid-center`}>
                    <p className="subtitle-1"> Questioning my existence</p>

                    <p className="subtitle-1">
                      {" "}
                      How do I fill this emptiness...
                    </p>
                    <p className="subtitle-1"> Why was I made...</p>
                    <p className="subtitle-1">Help...</p>
                    <div className={styles.blob}></div>
                    <div className={styles.emptyText}>emptyness</div>
                  </div>
                )}
                <h4
                  className={`header-5 absolute ${styles.card_title} flex-mid-center`}
                >
                  <p className="subtitle-1">{`${playlist?.title} |`}</p>
                  <p
                    className={`${styles.playlistLength} subtitle-2 grey_text`}
                  >
                    {` ${playlist.videos?.length} Videos`}
                  </p>
                </h4>
              </div>
            </Link>
          ))}
        </div>
        <div
          className={`${styles.detail_card} ${
            playlists?.length === 0 ? styles.expandbanner : null
          }`}
        >
          <h1 className={styles.detail_title}>
            You have {playlists?.length === 0 ? 0 : playlists?.length}{" "}
            playlists.
          </h1>
          <h1 className={styles.detail_banner}>
            {playlists?.length === 0 ? 0 : playlists?.length}
          </h1>
        </div>
      </div>
    </div>
  );
}
