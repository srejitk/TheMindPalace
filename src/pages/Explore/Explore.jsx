import styles from "./Explore.module.css";
import { CategoryChips, VideoCard } from "../../components";
import { useVideo } from "../../context/Video/VideoContext";
import { useUserDetails } from "../../context/User/UserContext";
import { useTheme } from "../../context/Theme/ThemeContext";
import { likeHandler, watchlaterHandler } from "../../services/ApiCalls";
import {
  addToWatchlater,
  removeFromWatchlater,
} from "../../context/Video/Watchlater";

export default function Explore() {
  const { filteredVideos } = useVideo();
  const { sidebar } = useTheme();
  const { userState, userDispatch } = useUserDetails();

  return (
    <div
      className={`${
        sidebar ? styles.openSesame : ""
      } flex-column-wrap flex-mid-center content`}
    >
      <div className={styles.page_header}>
        <h1>Explore</h1>
      </div>
      <CategoryChips />
      <div className={`${styles.videos_container} `}>
        {filteredVideos?.map((video) => (
          <VideoCard key={video._id} video={video} videoID={video.videoID}>
            {" "}
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
              <span className="material-icons">thumb_up</span>
              <p>Add to Liked</p>
            </div>
          </VideoCard>
        ))}
      </div>
    </div>
  );
}
