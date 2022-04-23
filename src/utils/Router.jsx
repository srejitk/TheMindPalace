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
} from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/history" element={<History />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/mockman" element={<Mockman />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
