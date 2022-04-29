export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_WATCHLATER":
    case "DELETE_FROM_WATCHLATER":
    case "GET_WATCHLATER":
      return { ...state, watchlater: payload };
    default:
      break;
  }
};
