import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ShelfChanger from "./shelfChanger";

/**
 * @description Represents the search books page
 * @constructor
 * @param {array} books - this contain the array of books
 * @param {array} searchBookList - Contain the list of search result i.e list of searched books
 * @param {function} searchBook - this function is used to search the book
 * @param {function} getAllBooks - this function is used to fetch all the books data from server
 * @param {function} changeShelve - this function is used to change the shelve of the book
 */

const SearchBooks = ({
  searchBookList,
  searchBook,
  getAllBooks,
  books,
  changeShelve
}) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link to="/">
        <button className="close-search" onClick={() => searchBook("")}>
          Close
        </button>
      </Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          onChange={e => searchBook(e.target.value)}
          autoFocus
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {searchBookList.length &&
          searchBookList.map(book => {
            let element = books.find(element => element.id === book.id);
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks &&
                          book.imageLinks.thumbnail})`
                      }}
                    ></div>
                    {element ? (
                      <ShelfChanger
                        book={element}
                        shelf={element.shelf}
                        getAllBooks={getAllBooks}
                        changeShelve={changeShelve}
                      />
                    ) : (
                      <ShelfChanger
                        book={book}
                        shelf={"none"}
                        getAllBooks={getAllBooks}
                        changeShelve={changeShelve}
                      />
                    )}
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors &&
                    book.authors.length &&
                    book.authors.map((author, key) => (
                      <div className="book-authors" key={key}>
                        {author}
                      </div>
                    ))}
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  </div>
);

SearchBooks.propTypes = {
  searchBookList: PropTypes.array.isRequired,
  searchBook: PropTypes.func.isRequired,
  getAllBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  changeShelve: PropTypes.func.isRequired
};

export default SearchBooks;
