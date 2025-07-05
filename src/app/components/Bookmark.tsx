import React from "react";
import { MediaItem } from "../utils/types";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BookmarkProps {
  items: MediaItem[];
  onBookmark: (id: string) => void;
}

const Bookmark: React.FC<BookmarkProps> = ({ items, onBookmark }) => {
  return (
    <div className="recommended">
      <h1>Bookmarked Movies</h1>
      <div className="recommendedContainer flex w-max grid grid-cols-4 gap-[40px]">
        {Array.isArray(items) && (
          <AnimatePresence>
            {items.map((e) => {
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
  );
};

export default Bookmark;
