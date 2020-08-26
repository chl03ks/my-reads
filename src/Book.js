import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./Book.module.css";

import { update } from "./utils/BooksApi";

const Book = React.memo((props) => {
  const {
    id,
    title,
    authors = [],
    imageLinks,
    shelf = "none",
    onUpdateShelfs,
  } = props;

  const [state, setstate] = useState(shelf);
  const { smallThumbnail } = imageLinks;

  const handleChange = (event) => {
    setstate(event.target.value);
    update(id, event.target.value).then(onUpdateShelfs);
  };

  return (
    <div className={styles.book}>
      <img className={styles.book_img} src={smallThumbnail} alt="" />
      <h3>{title}</h3>
      <p>{authors.join(", ")}</p>
      <select value={state} onChange={handleChange}>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
});

Book.propTypes = {
  title: PropTypes.string,
  shelf: PropTypes.string,
  authors: PropTypes.array,
  imageLinks: PropTypes.object,
  onChange: PropTypes.func,
};

export default Book;
