import React from "react";
import { Link } from "react-router-dom";

import useBooks from "./utils/useBooks";
import BooksSection from "./BooksSection";

export default function Home() {
  const [state, setState] = useBooks();

  const updateSections = (shelfs) => {
    setState((prevState) => ({ ...prevState, sections: shelfs }));
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
            updateSections={updateSections}
          ></BooksSection>
        );
      })}
      <div className="search-link">
        <Link to="/search"> Search </Link>
      </div>
    </div>
  );
}
