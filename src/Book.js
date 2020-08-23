import React from "react";
import PropTypes from "prop-types";

import styles from "./Book.module.css";

const Book = React.memo(({ id, title, authors, imageLinks, shelf, onChange }) => {
  const { smallThumbnail } = imageLinks;

  const handleChange = (event) => {
    onChange(id, event.target.value);
  };

  return (
    <div className={styles.book}>
      <img className={styles.book_img} src={smallThumbnail} alt="" />
      <h3>{title}</h3>
      <p>{authors.join(", ")}</p>
      <select value={shelf} onChange={handleChange}>
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
