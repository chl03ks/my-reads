import React, { useState } from "react";
import useBooks from "./utils/useBooks";

import Book from "./Book";
import SearchInput from "./SearchInput";

export default function Search() {
  const [books, setBooks] = useState([]);
  const [errorState, setErrorState] = useState({
    hasError: false,
    message: "",
  });
  const [userBooks, setUserBooks] = useBooks();
  const { currentlyReading, wantToRead, read } = userBooks.sections;

  const onSearchResults = (results = []) => {
    if ("error" in results) {
      setErrorState({ hasError: true, message: results.error });
      setBooks([]);
      return;
    }
    setErrorState({ hasError: false });
    const shelfs = [...currentlyReading, ...wantToRead, ...read];
    const booksWithShelf = results.reduce((prev, current) => {
      if (shelfs.includes(current.id)) {
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
    setBooks(booksWithShelf);
  };

  const updateSections = (shelfs) => {
    setUserBooks((prevState) => ({ ...prevState, sections: shelfs }));
  };

  return (
    <div>
      <SearchInput onSearchResults={onSearchResults}></SearchInput>
      <div className="flex">
        {errorState.hasError && errorState.message}
        {books.map((book) => {
          return (
            <Book key={book.id} {...book} onChange={updateSections}></Book>
          );
        })}
      </div>
    </div>
  );
}
