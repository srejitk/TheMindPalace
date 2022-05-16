import toast from "react-hot-toast";

export const getVideoData = (videoID, videolist) =>
  videolist?.find((video) => video.videoID === videoID);

export const getRelated = (videoData, videolist) =>
  videolist?.filter((video) => video.category === videoData.category);

export const likeHandler = (videoData, userDispatch, userState) => {
  userState.liked?.includes(videoData)
    ? toast("Video is already Liked!", {
        icon: "❤️",
      })
    : userDispatch({ type: "LIKE_VIDEO", payload: videoData });
  toast("Liked!", {
    icon: "❤️",
  });
};

export const watchlaterHandler = (video, userState) => {
  return userState?.watchlater?.some((item) => video._id === item._id);
};
