import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "../../components";
import { useUserDetails } from "../../context/User/UserContext";

import styles from "./Playlist.module.css";
export default function Playlist() {
  const color = ["red", "blue"];
  const { userState } = useUserDetails();
  const { playlists } = userState;
  return (
    <div className={styles.playlist_page_wrapper}>
      <div className={styles.page_header}>
        <h1>Playlist</h1>
        <p className="subtitle-1">
          Total Playlist : {playlists?.length ? playlists?.length : 0}
        </p>
      </div>
      <div className={styles.page_content}>
        {playlists?.map((playlist) => (
          <Link to={`/playlist/${playlist._id}`} key={playlist._id}>
            <div className={styles.playlist_card}>
              <div className={styles.card_cover}></div>
              <div className={styles.blob}></div>
              <h4 className={`header-5 ${styles.card_title} p1b`}>
                {playlist.title}
              </h4>
              <p className="subtitle-1 p1b">{`${playlist.videos?.length} Videos`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
