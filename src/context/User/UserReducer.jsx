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
    default:
      break;
  }
};
