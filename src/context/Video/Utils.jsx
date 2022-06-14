export const compose =
  (state, ...functions) =>
  (data) => {
    return functions.reduce((acc, curr) => curr(state, acc), data);
  };

export const filterByCategory = (state, data) =>
  state.category === "All"
    ? data
    : data?.filter((video) => video.category === state.category);

export const sortByLatest = (state, data) =>
  state.sortBy === "Latest"
    ? [...data].sort((a, b) => new Date(b.published) - new Date(a.published))
    : data;

export const sortByOldest = (state, data) => {
  const { sortBy } = state;
  return sortBy === "Oldest"
    ? [...data].sort((a, b) => new Date(a.published) - new Date(b.published))
    : data;
};

export const searchByTitle = (state, data) =>
  data?.filter((video) =>
    video.title.toLowerCase().includes(state.searchBy.toLowerCase())
  );
