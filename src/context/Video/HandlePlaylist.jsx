import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const addPlaylist = async (playlistData, userDispatch) => {
  try {
    const response = await axios.post(
      "/api/user/playlists",
      {
        playlist: playlistData,
      },
      {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      }
    );
    const { status, data } = response;
    if (status === 200 || status === 201) {
      userDispatch({ type: "ADD_PLAYLIST", payload: data?.playlists });
      toast.success("Playlist created");
    }
  } catch (error) {
    toast.error("Error creating playlist");
    console.log(error);
  }
};

export const deletePlaylist = async (playlist, userDispatch) => {
  try {
    const response = await axios.delete(`/api/user/playlists/${playlist._id}`, {
      headers: {
        authorization: localStorage.getItem("Token"),
      },
    });
    const { status, data } = response;
    if (status === 200 || status === 201) {
      userDispatch({ type: "DELETE_PLAYLIST", payload: data?.playlists });
    }
  } catch (error) {}
};

export const addToPlaylist = async (playlistID, video, userDispatch) => {
  try {
    const response = await axios.post(
      `/api/user/playlists/${playlistID}`,
      {
        video,
      },
      {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      }
    );
    const { status, data } = response;
    if (status === 200 || status === 201) {
      userDispatch({ type: "ADD_TO_PLAYLIST", payload: data?.playlist });
      toast.success("Video added to playlist!");
    }
  } catch (error) {
    toast.error("Couldn't add to playlist");
    console.log(error);
  }
};

export const deleteFromPlaylist = async (playlist, video, userDispatch) => {
  try {
    const response = await axios.delete(
      `/api/user/playlists/${playlist?._id}/${video?._id}`,
      {
        headers: {
          authorization: localStorage.getItem("Token"),
        },
      }
    );
    const { status, data } = response;
    if (status === 200 || status === 201) {
      userDispatch({ type: "DELETE_FROM_PLAYLIST", payload: data?.playlist });
      toast.success("Video deleted from playlist!");
    }
  } catch (error) {
    toast.error("Couldn't delete from playlist");
    console.log(error);
  }
};
