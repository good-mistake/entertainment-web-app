import React from "react";
import { MediaItem } from "../utils/types";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
interface BookmarkProps {
  items: MediaItem[];
  onBookmark: (id: string) => void;
}

const Bookmark: React.FC<BookmarkProps> = ({ items, onBookmark }) => {
  const search = useSelector((state: RootState) => state.media.search);
  const movieBookmark = items.filter(
    (item) =>
      item.category === "Movie" &&
      item.isBookmarked &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  const tvBookmark = items.filter(
    (item) =>
      item.category === "TV Series" &&
      item.isBookmarked &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="recommended">
      <h1>Bookmarked Movies</h1>
      <div className="recommendedContainer flex w-max grid grid-cols-4 gap-[40px]">
        {Array.isArray(movieBookmark) && (
          <AnimatePresence>
            {movieBookmark.map((e) => {
              return (
                <motion.div
                  key={e.id}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="recommendedItems"
                >
                  <div
                    style={{
                      backgroundImage: `url(${e.thumbnail.regular.small})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <motion.div
                      onClick={() => onBookmark(e.id)}
                      whileTap={{ scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className={`bookmark ${e.isBookmarked ? "active" : ""}`}
                    >
                      {e.isBookmarked ? (
                        <Image
                          src={`/assets/icon-bookmark-full.svg`}
                          width={12}
                          height={14}
                          alt="bookmark"
                        />
                      ) : (
                        <Image
                          src={`/assets/icon-bookmark-empty.svg`}
                          width={12}
                          height={14}
                          alt="bookmark"
                        />
                      )}
                    </motion.div>
                  </div>
                  <div className="details">
                    <ul className="flex  text-sm ">
                      <li>{e.year}</li>
                      <span></span>
                      <li>
                        <Image
                          src={`${
                            e.category === "Movie"
                              ? "/assets/icon-category-movie.svg"
                              : "/assets/icon-category-tv.svg"
                          }`}
                          width={12}
                          height={12}
                          alt="bookmark"
                        />
                        {e.category}
                      </li>
                      <span></span>
                      <li>{e.rating}</li>
                    </ul>
                    <h2>{e.title}</h2>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
      <div className="tv">
        <h1>Bookmarked TV Series</h1>
        <div className="recommendedContainer flex w-max grid grid-cols-4 gap-[40px]">
          {Array.isArray(tvBookmark) && (
            <AnimatePresence>
              {tvBookmark.map((e) => {
                return (
                  <motion.div
                    key={e.id}
                    layout
                    exit={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="recommendedItems"
                  >
                    <div
                      style={{
                        backgroundImage: `url(${e.thumbnail.regular.small})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <motion.div
                        onClick={() => onBookmark(e.id)}
                        whileTap={{ scale: 0.8 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        className={`bookmark ${e.isBookmarked ? "active" : ""}`}
                      >
                        {e.isBookmarked ? (
                          <Image
                            src={`/assets/icon-bookmark-full.svg`}
                            width={12}
                            height={14}
                            alt="bookmark"
                          />
                        ) : (
                          <Image
                            src={`/assets/icon-bookmark-empty.svg`}
                            width={12}
                            height={14}
                            alt="bookmark"
                          />
                        )}
                      </motion.div>
                    </div>
                    <div className="details">
                      <ul className="flex  text-sm ">
                        <li>{e.year}</li>
                        <span></span>
                        <li>
                          <Image
                            src={`${
                              e.category === "Movie"
                                ? "/assets/icon-category-movie.svg"
                                : "/assets/icon-category-tv.svg"
                            }`}
                            width={12}
                            height={12}
                            alt="bookmark"
                          />
                          {e.category}
                        </li>
                        <span></span>
                        <li>{e.rating}</li>
                      </ul>
                      <h2>{e.title}</h2>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
