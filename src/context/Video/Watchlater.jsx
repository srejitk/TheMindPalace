import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Toast from "../../components/Toast/Toast";

export const getWatchlater = async (userDispatch) => {
  try {
    const response = await axios.get("/api/user/watchlater", {
      headers: {
        authorization: localStorage.getItem("Token"),
      },
    });
    const { status, data } = response;
    if (status === 200) {
      userDispatch({ type: "GET_WATCHLATER", payload: data?.watchlater });
    }
  } catch (error) {
    Toast({ message: "Couldn't fetch Watchlist", type: "error" });
    console.log(error);
  }
};

export const addToWatchlater = async (video, userDispatch) => {
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
      userDispatch({ type: "ADD_TO_WATCHLATER", payload: data?.watchlater });
      toast.success("Saved to Watchlist");
    } else if (status === 409) {
      toast.error("Video already saved to watch later");
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  }
};

export const removeFromWatchlater = async (video, userDispatch) => {
  try {
    const response = await axios.delete(`/api/user/watchlater/${video._id}`, {
      headers: {
        authorization: localStorage.getItem("Token"),
      },
    });
    const { status, data } = response;
    if (status === 200) {
      userDispatch({
        type: "DELETE_FROM_WATCHLATER",
        payload: data?.watchlater,
      });
      toast.success("Deleted from Watchlist");
    }
  } catch (error) {
    toast.error("Couldn't delete from Watch later");
    console.log(error);
  }
};
