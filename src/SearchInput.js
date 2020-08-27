import React, { useState, useEffect } from "react";
import useDebounce from "./utils/useDebounce";
import { search } from "./utils/BooksApi";

export default function SearchInput({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    if (debouncedSearchTerm) {
      search(debouncedSearchTerm).then((results) => {
        onSearchResults(results);
      });
    } else {
      onSearchResults([]);
    }
  }, [debouncedSearchTerm, onSearchResults]);

  return (
    <input
      placeholder="Search.."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  );
}
