import axios from "axios";
import toast from "react-hot-toast";

export const addToHistory = async (video, userDispatch) => {
  try {
    const response = await axios.post(
      "/api/user/history",
      { video: video },
      {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      }
    );
    const { status, data } = response;
    if (status === 201) {
      userDispatch({ type: "ADD_TO_HISTORY", payload: data?.history });
    }
  } catch (error) {
    if (error.response.status === 409) {
      //Do Nothing
    } else {
      console.log("Couldn't add to History", error);
    }
  }
};

export const removeFromHistory = async (video, userDispatch) => {
  try {
    const response = await axios.delete(`/api/user/history/${video._id}`, {
      headers: {
        authorization: localStorage.getItem("Token"),
      },
    });
    const { status, data } = response;
    if (status === 200 || status === 201) {
      userDispatch({ type: "REMOVE_FROM_HISTORY", payload: data?.history });
    }
  } catch (error) {
    console.log("Couldn't remove from History", error);
    toast.error("Couldn't remove from history");
  }
};

export const clearHistory = async (userDispatch) => {
  try {
    const response = await axios.delete(`/api/user/history/all`, {
      headers: {
        authorization: localStorage.getItem("Token"),
      },
    });
    const { status, data } = response;
    if (status === 200 || status === 201) {
      userDispatch({ type: "CLEAR_HISTORY", payload: data?.history });
      toast.success("History Cleared");
    }
  } catch (error) {
    console.log("Couldn't clear History", error);
    toast.error("Couldn't clear History");
  }
};
