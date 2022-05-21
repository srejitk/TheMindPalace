import React, { useState, useEffect } from "react";
import { useUserDetails } from "../../context/User/UserContext";
import { toast } from "react-toastify";
import styles from "./Modal.module.css";
import { addToPlaylist, addPlaylist } from "../../context/Video/HandlePlaylist";

export default function Modal({ showModal, setShowModal, videoData }) {
  const { userState, userDispatch } = useUserDetails();
  const { playlists } = userState;
  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    description: "",
  });

  const addPlaylistHandler = () => {
    if (newPlaylist.title === " " || newPlaylist.title === "") {
      toast.error("Playlist name can't be empty");
      return;
    }
    setNewPlaylist({ title: "", description: "" });
    addPlaylist(newPlaylist, userDispatch);
  };

  const findIfVideoInPlaylist = (playlist) =>
    playlist?.videos?.some((video) => video._id === videoData._id);

  const addVideoHandler = (playlistID) =>
    addToPlaylist(playlistID, videoData, userDispatch);

  return (
    <div
      className={`${styles.modal_container} ${
        showModal ? styles.showModal : styles.hideModal
      }flex-column-wrap flex-mid-center`}
    >
      <div className="full-width p1side subtitle-1 flex-left-center">
        Save to
      </div>
      <div className={`${styles.playlist_container}`}>
        {playlists?.map((playlist) => (
          <div
            key={playlist._id}
            onClick={(e) =>
              findIfVideoInPlaylist(playlist)
                ? toast.error("Video already exists in playlist")
                : addVideoHandler(playlist._id)
            }
            className={`${styles.dialog} flex-row-nowrap`}
          >
            <span
              className={`material-icons ${
                findIfVideoInPlaylist(playlist) ? "brand-color" : ""
              }`}
            >
              {findIfVideoInPlaylist(playlist) ? `check_circle` : `add_circle`}
            </span>
            <p>{playlist.title}</p>
          </div>
        ))}
      </div>
      <div className={`flex-column-wrap`}>
        <div className={`input__container ${styles.add_playlist}`}>
          <input
            type="text"
            placeholder="Enter Playlist Name..."
            id="name"
            value={newPlaylist.title}
            onChange={(e) =>
              setNewPlaylist({ ...newPlaylist, title: e.target.value })
            }
            className={`input__field ${styles.new_playlist}`}
          />
        </div>
        <div className={styles.btn_container}>
          <button
            className={`brand-color ${styles.btn}`}
            onClick={addPlaylistHandler}
          >
            Create
          </button>
          <button
            className={styles.btn}
            onClick={() => setShowModal(!showModal)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
