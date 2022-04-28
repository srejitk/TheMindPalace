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
import RequireAuth from "./RequireAuth";

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Explore />
          </RequireAuth>
        }
      />
      <Route
        path="/history"
        element={
          <RequireAuth>
            <History />
          </RequireAuth>
        }
      />
      <Route
        path="/liked"
        element={
          <RequireAuth>
            <Liked />
          </RequireAuth>
        }
      />

      <Route
        path="/watchlist"
        element={
          <RequireAuth>
            <Watchlist />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mockman" element={<Mockman />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
