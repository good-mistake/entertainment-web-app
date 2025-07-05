"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { fetchMediaItems } from "./redux/mediaSlice";
import { MediaItem } from "./utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import Trending from "./components/Trending";
import { login } from "./redux/userSlice";
import Search from "./components/Search";
import Recommended from "./components/Recommended";
import { toggleBookmark } from "./redux/mediaSlice";
import { motion, AnimatePresence } from "framer-motion";
import Movies from "./components/Movies";
import Tvseries from "./components/Tvseries";
import Bookmark from "./components/Bookmark";
import { toggleBookmarkBackend } from "./redux/mediaSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const items: MediaItem[] = useSelector(
    (state: RootState) => state.media.items
  );
  const loading = useSelector((state: RootState) => state.media.loading);
  const user = useSelector((state: RootState) => state.user.user);
  const [view, setView] = useState("home");
  const search = useSelector((state: RootState) => state.media.search);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (token && userString) {
      const user = JSON.parse(userString);
      dispatch(login(user));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMediaItems(isAuthenticated));
  }, [dispatch, isAuthenticated]);
  const handleBookmark = (id: string) => {
    if (isAuthenticated) {
      dispatch(toggleBookmarkBackend(id));
    } else {
      dispatch(toggleBookmark(id));
    }
  };
  const trendingItems = items.filter((item) => item.isTrending);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      !item.isTrending
  );

  const filteredMovies = items.filter((item) => item.category === "Movie");
  const filteredTv = items.filter((item) => item.category === "TV Series");
  const filteredBookmark = items.filter((item) => item.isBookmarked);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home ">
      <Navbar userColor={user?.color} onNavigate={setView} view={view} />
      <div className="right">
        <Search />
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {trendingItems && (
                <Trending items={trendingItems} onBookmark={handleBookmark} />
              )}

              {filteredItems.length > 0 ? (
                <Recommended
                  items={filteredItems}
                  onBookmark={handleBookmark}
                />
              ) : (
                <h1 className="noResult">No results found</h1>
              )}
            </motion.div>
          )}
          {view === "movies" && (
            <motion.div
              key="movies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Movies items={filteredMovies} onBookmark={handleBookmark} />
            </motion.div>
          )}
          {view === "tv" && (
            <motion.div
              key="tv"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Tvseries items={filteredTv} onBookmark={handleBookmark} />
            </motion.div>
          )}
          {view === "bookmark" && (
            <motion.div
              key="bookmark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Bookmark items={filteredBookmark} onBookmark={handleBookmark} />
            </motion.div>
          )}
        </AnimatePresence>{" "}
      </div>
    </div>
  );
}
