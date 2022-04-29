import React from "react";
import styles from "./Watchlist.module.css";
import HorizontalVideoCard from "../../components/HorizontalVideoCard/HorizontalVideoCard";
import { useUserDetails } from "../../context/User/UserContext";
import { useVideo } from "../../context/Video/VideoContext";

export default function Watchlist() {
  const { userState } = useUserDetails();
  return (
    <div className="flex-column-wrap content default">
      <div className={styles.watchlist_container}>
        <div className="flex-mid-center flex-column-wrap">
          <img
            className={`${styles.emptyImage} ${
              userState.watchlater?.length === 0
                ? styles.emptyImage
                : styles.hide
            }`}
            src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1651220437/TheMindPalace/Empty-cuate_tqyt8f.svg"
          />
          <h5
            className={` header-6 ${
              userState.watchlater?.length === 0
                ? styles.emptyTitle
                : styles.hide
            }`}
          >
            A bit quiet here innit??
          </h5>
        </div>

        {userState.watchlater?.map((video) => (
          <HorizontalVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
