import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Explore,
  History,
  Liked,
  Login,
  Mockman,
  Signup,
  Watchlist,
  Error,
  PlayVideo,
  Playlist,
  SinglePlaylist,
  Profile,
} from "../pages";
import RequireAuth from "./RequireAuth";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route element={<RequireAuth />}>
        {" "}
        <Route path="/history" element={<History />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path={`/playlist/:playlistID`} element={<SinglePlaylist />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/video/:videoID" element={<PlayVideo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mockman" element={<Mockman />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
