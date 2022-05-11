export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_WATCHLATER":
    case "DELETE_FROM_WATCHLATER":
    case "GET_WATCHLATER":
      return { ...state, watchlater: payload };
    case "LIKE_VIDEO":
      if (state.liked?.includes(payload)) {
        return {
          ...state,
          liked: [
            ...state.liked.filter((video) => video?._id !== payload?._id),
          ],
        };
      } else {
        return { ...state, liked: [...state.liked, payload] };
      }
    case "ADD_TO_HISTORY":
    case "REMOVE_FROM_HISTORY":
    case "CLEAR_HISTORY":
      return {
        ...state,
        history: payload,
      };
    case "ADD_PLAYLIST":
    case "DELETE_PLAYLIST":
      return { ...state, playlists: payload };
    case "ADD_TO_PLAYLIST":
      const updatedPlaylist = state.playlists?.map((item) =>
        item._id === payload?._id ? payload : item
      );
      return { ...state, playlists: updatedPlaylist };
    case "DELETE_FROM_PLAYLIST":
      const playlistUpdated = state.playlists?.map((item) =>
        item._id === findPlaylist?._id ? payload : item
      );
      return { ...state, playlists: playlistUpdated };
    default:
      break;
  }
};
