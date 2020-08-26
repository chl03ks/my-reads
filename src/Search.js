import React, { useState } from "react";

import { search, update } from "./utils/BooksApi";
import useBooks from "./utils/useBooks";

import Book from "./Book";
import SearchInput from "./SearchInput";

export default function Search() {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useBooks();

  const { currentlyReading, wantToRead, read } = userBooks.sections;

  const sendSearch = (query) => {
    const shelfs = [...currentlyReading, ...wantToRead, ...read];
    search(query).then((result) => {
      console.log(result)
      if (result.error) {
        setBooks([]);
      } else {
        const booksWithShelf = result.reduce((prev, current) => {
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
      }
    });
  };

  const updateSections = (shelfs) => {
    setUserBooks((prevState) => ({ ...prevState, sections: shelfs }));
  };

  return (
    <div>
      <SearchInput sendSearch={sendSearch}></SearchInput>
      <div className="flex">
        {books.map((book) => {
          return (
            <Book key={book.id} {...book} onChange={updateSections}></Book>
          );
        })}
      </div>
    </div>
  );
}
