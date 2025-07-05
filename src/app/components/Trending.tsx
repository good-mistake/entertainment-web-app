import React from "react";
import Image from "next/image";
import { MediaItem } from "../utils/types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";

interface TrendingProps {
  items: MediaItem[];
  onBookmark: (id: string) => void;
}

const Trending: React.FC<TrendingProps> = ({ items, onBookmark }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: "auto",
      spacing: 40,
    },
    breakpoints: {
      "(max-width: 500px)": {
        slides: {
          perView: "auto",
          spacing: 16,
        },
      },
    },
  });

  return (
    <main className="mainTrending px-4 max-w-full  ">
      <h1>Trending</h1>
      <div>
        <div ref={sliderRef} className="keen-slider flex w-max">
          {Array.isArray(items) &&
            items.map((e) => {
              return (
                <div
                  key={`${e.year}+${e.title}` || e?.id}
                  className="keen-slider__slide w-[470px] h-[230px] flex-shrink-0 
                  rounded-md relative text-white bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${e.thumbnail.trending?.large})`,
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
                    className={`bookmark absolute top-4 right-6 ${
                      e.isBookmarked ? "active" : ""
                    }`}
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
                  <div className="details absolute bottom-[22px] left-6">
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
    </main>
  );
};

export default Trending;
