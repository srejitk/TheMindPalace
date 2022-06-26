export const sidebarItems = [
  {
    path: "/",
    icon: `explore`,
    label: "Explore",
  },
  {
    path: "/watchlist",
    icon: `watch_later`,
    label: "Watchlist",
  },
  {
    path: "/history",
    icon: `history`,
    label: "History",
  },
  {
    path: "/liked",
    icon: `thumb_up`,
    label: "Liked",
  },
  {
    path: "/playlist",
    icon: `playlist_play`,
    label: "Playlists",
  },
  {
    path: "/profile",
    icon: `person`,
    label: "Profile",
  },
];

export const emailRegex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
export const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
);
