import axios from "axios";
import Toast from "../../components/Toast/Toast";

export const getWatchlater = async (videoDispatch) => {
  try {
    const response = await axios.get("/api/user/watchlater", {
      headers: {
        authorization: localStorage.getItem("Token"),
      },
    });
    const { status, data } = response;
    if (status === 200) {
      videoDispatch({ type: "GET_WATCHLATER", payload: data?.watchlater });
    }
  } catch (error) {
    Toast({ message: "Couldn't fetch Watchlist", type: "error" });
    console.log(error);
  }
};

export const addToWatchlater = async (video, videoDispatch) => {
  try {
    const response = await axios.post(
      "/api/user/watchlater",

      { video: video },
      {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      }
    );
    const { status, data } = response;
    if (status === 200 || status === 201) {
      videoDispatch({ type: "ADD_TO_WATCHLATER", payload: data?.watchlater });
      Toast({ message: "Added to Watchlist", type: "success" });
    }
  } catch (error) {
    Toast({ message: "Couldn't add to Watchlist", type: "error" });
    console.log(error);
  }
};

export const removeFromWatchlater = async (video, videoDispatch) => {
  try {
    const response = await axios.delete(`/api/user/watchlater/${video._id}`, {
      headers: {
        authorization: localStorage.getItem("Token"),
      },
    });
    const { status, data } = response;
    if (status === 200) {
      videoDispatch({
        type: "DELETE_FROM_WATCHLATER",
        payload: data?.watchlater,
      });
      Toast({ message: "Deleted from Watchlist", type: "success" });
    }
  } catch (error) {
    Toast({ message: "Couldn't delete from Watchlist", type: "error" });
    console.log(error);
  }
};
