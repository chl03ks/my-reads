import React, { Component } from "react";

import { getAll, update } from "./utils/BooksApi";
import BooksSection from "./BooksSection";

export default class Home extends Component {
  state = {
    books: [],
    sections: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
  };
  componentDidMount() {
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
      this.setState({ books, sections });
    });
  }

  updateSections = (book, shelf) => {
    update(book, shelf).then((shelfs) => {
      this.setState({ sections: shelfs });
    });
  };

  toCapitalizedWords = (name) => {
    var words = name.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(this.capitalize).join(" ");
  };

  capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
  };

  render() {
    return (
      <div>
        <h1>My Reads</h1>
        {Object.keys(this.state.sections).map((key) => {
          return (
            <BooksSection
              key={key}
              shelf={key}
              title={this.toCapitalizedWords(key)}
              books={this.state.sections[key]}
              allBooks={this.state.books}
              onChange={this.updateSections}
            ></BooksSection>
          );
        })}
      </div>
    );
  }
}
