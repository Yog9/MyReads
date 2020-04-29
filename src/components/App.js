import React from "react";
import { Route, HashRouter } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import "../App.css";

let shelves = [
  { key: "currentlyReading", shelfName: "Currently Reading" },
  { key: "wantToRead", shelfName: "Want to Read" },
  { key: "read", shelfName: "Read" }
];

/**
 * @description Represents whole books app
 * @constructor
 */

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBookList: []
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = async () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books
        }));
      })
      .catch(err => {
        console.error(err);
      });
  };

  searchBook = async query => {
    if (query !== "") {
      BooksAPI.search(query)
        .then(searchBookList => {
          searchBookList.length
            ? this.setState({ searchBookList })
            : this.setState({ searchBookList: [] });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.setState({ searchBookList: [] });
    }
  };

  changeShelve = book => event => {
    event.persist();
    let shelf = event.target.value;
    BooksAPI.update(book, shelf)
      .then(() => {
        book.shelf = shelf;
        this.setState(prevState =>
          shelf === "none"
            ? {
                books: prevState.books.filter(
                  bookItem => bookItem.id !== book.id
                )
              }
            : {
                books: prevState.books
                  .filter(bookItem => bookItem.id !== book.id)
                  .concat(book)
              }
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { searchBookList, books } = this.state;

    return (
      <HashRouter basename="/MyReads">
        <div className="app">
          <Route
            exact
            path="/"
            render={() => (
              <ListBooks
                books={books}
                getAllBooks={this.getAllBooks}
                shelves={shelves}
                changeShelve={this.changeShelve}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                getAllBooks={this.getAllBooks}
                books={books}
                searchBook={this.searchBook}
                searchBookList={searchBookList}
                changeShelve={this.changeShelve}
              />
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

export default BooksApp;
