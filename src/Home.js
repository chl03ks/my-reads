import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAll, update } from "./utils/BooksApi";
import BooksSection from "./BooksSection";

export default function Home() {
  const [state, setState] = useState({
    books: [],
    sections: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
  });

  useEffect(() => {
    getAll().then((books) => {
      const sections = books.reduce(
        (prev, curr) => {
          const { shelf, id } = curr;
          prev[shelf].push(id);
          return prev;
        },
        {
          currentlyReading: [],
          wantToRead: [],
          read: [],
        }
      );
      setState({ books, sections });
    });
  }, []);

  const updateSections = (bookId, shelf) => {
    update(bookId, shelf).then((shelfs) => {
      setState((prevState) => ({ ...prevState, sections: shelfs }));
    });
  };

  const toCapitalizedWords = (name) => {
    var words = name.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(capitalize).join(" ");
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
  };

  return (
    <div>
      <h1>My Reads</h1>
      {Object.keys(state.sections).map((key) => {
        return (
          <BooksSection
            key={key}
            shelf={key}
            title={toCapitalizedWords(key)}
            books={state.sections[key]}
            allBooks={state.books}
            onChange={updateSections}
          ></BooksSection>
        );
      })}
      <div className="search-link">
        <Link to="/search"> Search </Link>
      </div>
    </div>
  );
}
