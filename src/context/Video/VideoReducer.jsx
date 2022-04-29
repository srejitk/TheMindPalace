export const VideoReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_VIDEOS":
      return { ...state, videolist: payload };
    default:
      return state;
  }
};
