import toast from "react-hot-toast";

export const getVideoData = (videoID, videolist) =>
  videolist?.find((video) => video.videoID === videoID);

export const getRelated = (videoData, videolist) =>
  videolist?.filter((video) => video?.category === videoData?.category);

export const likeHandler = (videoData, userDispatch, userState) => {
  if (localStorage.getItem("Token")) {
    if (userState.liked?.includes(videoData)) {
      userDispatch({ type: "UNLIKE_VIDEO", payload: videoData });
      toast("Unliked!", {
        icon: "💔",
      });
    } else {
      userDispatch({ type: "LIKE_VIDEO", payload: videoData });
      toast("Liked!", {
        icon: "❤️",
      });
    }
  } else {
    toast("Please login to continue", {
      icon: "🚫",
    });
  }
};

export const watchlaterHandler = (video, userState) => {
  return userState?.watchlater?.some((item) => video._id === item._id);
};
