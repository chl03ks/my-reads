import React, { useState, useCallback } from "react";

import useBooks from "./utils/useBooks";
import Book from "./Book";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

export default function Search() {
  const [books, setBooks] = useState([]);
  const [errorState, setErrorState] = useState({
    hasError: false,
    message: "",
  });
  const [userBooks, setUserBooks] = useBooks();

  const determineShelfs = (results, userBooks) => {
    const { currentlyReading, wantToRead, read } = userBooks.sections;
    const booksInShelfs = [...currentlyReading, ...wantToRead, ...read];
    return results.reduce((prev, current) => {
      if (booksInShelfs.includes(current.id)) {
        for (const shelf in userBooks.sections) {
          if (userBooks.sections[shelf].includes(current.id)) {
            current["shelf"] = shelf;
            prev.push(current);
            return prev;
          }
        }
      }
      prev.push(current);
      return prev;
    }, []);
  };

  const onSearchResults = useCallback(
    (results) => {
      if ("error" in results) {
        setErrorState({ hasError: true, message: results.error });
        setBooks([]);
        return;
      }
      setErrorState({ hasError: true });
      const booksWithShelf = determineShelfs(results, userBooks);
      setBooks(booksWithShelf);
      setErrorState(false);
    },
    [userBooks]
  );

  const updateSections = (shelfs) => {
    setUserBooks((prevState) => ({ ...prevState, sections: shelfs }));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <Link to="/">Home</Link>
        </div>
        <SearchInput onSearchResults={onSearchResults}></SearchInput>
      </div>
      <div className="flex">
        {errorState.hasError && "No results"}
        {books.map((book) => {
          return (
            <Book key={book.id} {...book} onChange={updateSections}></Book>
          );
        })}
      </div>
    </div>
  );
}
