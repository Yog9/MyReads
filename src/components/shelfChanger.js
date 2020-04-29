import React from "react";
import PropTypes from "prop-types";

/**
 * @description This represents the options for changing the shelves
 * @constructor
 * @param {object} book - this contain the data about the book
 * @param {string} shelf - Contain the name of the shelf
 * @param {function} changeShelve - this function is used to change the shelve of the book
 */

const ShelfChanger = ({ shelf, book, changeShelve }) => (
  <div className="book-shelf-changer">
    <select value={shelf} onChange={changeShelve(book)}>
      <option value="move" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
);

ShelfChanger.propTypes = {
  shelf: PropTypes.string.isRequired,
  book: PropTypes.object.isRequired,
  changeShelve: PropTypes.func.isRequired
};

export default ShelfChanger;
