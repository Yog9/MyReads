import React from "react";
import PropTypes from "prop-types";
import ShelfChanger from "./shelfChanger";

/**
 * @description Represents a shelf of books
 * @constructor
 * @param {array} books - this contain the array of books
 * @param {array} shelves - Contain the data about different shelves
 * @param {function} getAllBooks - this function is used to fetch all the books data from server
 * @param {function} changeShelve - this function is used to change the shelve of the book
 */

const BookShelf = ({ books, shelves, getAllBooks, changeShelve }) =>
  shelves.map((shelf, index) => (
    <div className="bookshelf" key={index}>
      <h2 className="bookshelf-title">{shelf.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(
            (book, index) =>
              book.shelf === shelf.key && (
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}
                      ></div>
                      <ShelfChanger
                        book={book}
                        shelf={book.shelf}
                        getAllBooks={getAllBooks}
                        changeShelve={changeShelve}
                      />
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors.length &&
                      book.authors.map((author, key) => (
                        <div className="book-authors" key={key}>
                          {author}
                        </div>
                      ))}
                  </div>
                </li>
              )
          )}
        </ol>
      </div>
    </div>
  ));

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  getAllBooks: PropTypes.func.isRequired,
  changeShelve: PropTypes.func.isRequired
};

export default BookShelf;
