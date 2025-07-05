import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSearch } from "../redux/mediaSlice";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.media.search);
  return (
    <label htmlFor="search" className="search">
      <Image
        src={`/assets/icon-search.svg`}
        alt="search"
        width={32}
        height={32}
      />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search for movies or TV series"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </label>
  );
};

export default Search;
