import React, { useState, useEffect } from "react";

import styles from "./Book.module.css";

export default React.memo((book) => {
  
  const { title, authors = [], imageLinks, shelf, onChange } = book;
  const { smallThumbnail } = imageLinks;

  const handleChange = (event) => {
    onChange(book, event.target.value);
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
