/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const searchUser = async (search: string) => {
    try {
      const response = await axios.post("/api/search", { search });
      setSearchResults(response.data.result);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        className="border-b border-b-[#737373] w-full md:w-[30rem] text-3xl px-2 py-1"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
          searchUser(e.target.value);
        }}
      />
      <div className="flex flex-col justify-center items-center md:flex-wrap">
        {searchResults.map((user) => (
          <Link href={`/${user.id}`} className="flex flex-col justify-center items-center gap-2" key={user.name}>
            <img className="w-60" src={user.image} alt={`${user.name}'s profile`} />
            <p>{user.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
