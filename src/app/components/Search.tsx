import React from "react";
import Image from "next/image";
interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}
const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
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
        onChange={(e) => setSearch(e.target.value)}
      />
    </label>
  );
};

export default Search;
