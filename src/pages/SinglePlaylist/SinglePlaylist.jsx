import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useUserDetails } from "../../context/User/UserContext";
import styles from "./SinglePlaylist.module.css";
import HorizontalVideoCard from "../../components/HorizontalVideoCard/HorizontalVideoCard";

export default function SinglePlaylist() {
  const { userState } = useUserDetails();
  const { playlists } = userState;
  const { playlistID } = useParams();
  const findPlaylist = playlists?.find((item) => item._id === playlistID);

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.page_header}>
        <h1>{findPlaylist?.title}</h1>
        <p className="subtitle-1">Total Videos :</p>
      </div>

      <div className={styles.page_content}>
        {findPlaylist.videos?.map((item) => (
          <HorizontalVideoCard video={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
