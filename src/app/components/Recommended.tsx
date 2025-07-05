import React from "react";
import { MediaItem } from "../utils/types";
import Image from "next/image";
import { motion } from "framer-motion";

interface RecommendedProps {
  items: MediaItem[];
  onBookmark: (id: string) => void;
}

const Recommended: React.FC<RecommendedProps> = ({ items, onBookmark }) => {
  return (
    <div className="recommended">
      <h1>Recommended for you</h1>
      <div className="recommendedContainer flex w-max grid grid-cols-4 gap-[40px]">
        {Array.isArray(items) &&
          items.map((e) => {
            return (
              <div
                key={`${e.year}+${e.title}` || e?.id}
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Recommended;
