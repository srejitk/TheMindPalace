export const VideoReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CATEGORY":
      return { ...state, category: payload };
    case "SET_SORT":
      return { ...state, sortBy: payload };
    case "GET_VIDEOS":
      return { ...state, videolist: payload };
    default:
      return state;
  }
};
