import toast from "react-hot-toast";
import axios from "axios";
import { useLocation } from "react-router-dom";
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

export const handleLogin = async (
  loginData,
  setIsLogged,
  setUserDetails,
  navigate
) => {
  try {
    const response = await axios.post("/api/auth/login", loginData);
    if (response.status === 200) {
      setIsLogged(true);
      setUserDetails(response.data.foundUser);
      localStorage.setItem("Token", response.data.encodedToken);
      toast.success("You're signed in.");
      navigate("/");
    }
  } catch (error) {
    console.log(error);
    toast.error("We couldn't sign you in.");
  }
};
