import { useState, useEffect } from "react";

import { getAll } from "./BooksApi";

export default function () {
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

  return [state, setState];
};
