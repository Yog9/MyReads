import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookShelf from "./bookShelf";

/**
 * @description Represents a list of book
 * @constructor
 * @param {array} books - this contain the array of books
 * @param {array} shelves - Contain the data about different shelves
 * @param {function} getAllBooks - this function is used to fetch all the books data from server
 * @param {function} changeShelve - this function is used to change the shelve of the book
 */

const ListBooks = ({ books, shelves, getAllBooks, changeShelve }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <BookShelf
          books={books}
          shelves={shelves}
          getAllBooks={getAllBooks}
          changeShelve={changeShelve}
        />
      </div>
    </div>
    <div className="open-search">
      <Link to="/MyReads/search">
        <button>Add a book</button>
      </Link>
    </div>
  </div>
);

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  getAllBooks: PropTypes.func.isRequired,
  changeShelve: PropTypes.func.isRequired
};

export default ListBooks;
