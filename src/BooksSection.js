import React from "react";
import Book from "./Book";

export default function BooksSection({
  allBooks = [],
  books = [],
  title,
  shelf,
  onChange,
}) {
  const filterBooks = allBooks.filter(({ id }) => books.includes(id));
  return (
    <div className="books-section">
      <h1>{title}</h1>
      <hr />
      <div className="book-list flex">
        {filterBooks.map((book, index) => (
          <Book
            key={book.id}
            {...book}
            shelf={shelf}
            onChange={onChange}
          ></Book>
        ))}
      </div>
    </div>
  );
}
