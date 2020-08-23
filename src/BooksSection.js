import React from "react";
import PropTypes from "prop-types";

import Book from "./Book";

function BooksSection({
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

BooksSection.propTypes = {
  allBooks: PropTypes.array,
  books: PropTypes.array,
  title: PropTypes.string,
  shelf: PropTypes.string,
  onChange: PropTypes.func
}

export default BooksSection;