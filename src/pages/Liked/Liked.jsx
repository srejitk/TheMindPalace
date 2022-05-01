import React from "react";
import styles from "./Liked.module.css";
import HorizontalVideoCard from "../../components/HorizontalVideoCard/HorizontalVideoCard";
import { useUserDetails } from "../../context/User/UserContext";

export default function Liked() {
  const { userState } = useUserDetails();
  return (
    <div className="flex-column-wrap content default">
      <div className={styles.watchlist_container}>
        <div className="flex-mid-center flex-column-wrap">
          <img
            className={`${styles.emptyImage} ${
              userState.liked?.length === 0 ? styles.emptyImage : styles.hide
            }`}
            src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1651220437/TheMindPalace/Empty-cuate_tqyt8f.svg"
          />
          <h5
            className={` header-6 ${
              userState.liked?.length === 0 ? styles.emptyTitle : styles.hide
            }`}
          >
            You haven't liked anything yet :/
          </h5>
        </div>

        {userState.liked?.map((video) => (
          <HorizontalVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
