import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import BookShelf from '../bookShelf';
import UndefinedBooksListException from './UndefinedBooksListException';
import { filterBooksListByShelfId } from '../../common/utils/bookUtils';
import { getAllBooks } from '../../common/api/BooksAPI';

/**
 * A library containing various books categorized into multiple bookshelves.
 * @class
 * @extends {Component}
 */
class MyReads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shelves: {},
    };

    // Bindings to 'this'
    this.onShelfChange = this.onShelfChange.bind(this);
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  /**
   * Each time a shelfChange occurs on a 'Book', we should re-fetch all of the books.
   * @param  {Object}  updatedBooks Return value of running the PUT fetch call on the /books/bookID
   * @return {Promise}
   */
  onShelfChange(updatedBooks) {
    if (!isEmpty(updatedBooks)) {
      this.fetchAllBooks();
    }
    return null;
  }

  /**
   * Make a fetch request to get all of the books for the given user (me in this case)
   * @return {Promise}
   */
  fetchAllBooks() {
    getAllBooks()
      .then(res => {
        /** @type {Array} This is the final booksList coming back from the API fetch call */
        const booksList = res.books ? res.books : [];
        /** @type {Array} Filtered books on the 'currentlyReading' shelf. */
        const currentlyReading = filterBooksListByShelfId(booksList, 'currentlyReading');
        /** @type {Array} Filtered books on the 'read' shelf. */
        const read = filterBooksListByShelfId(booksList, 'read');
        /** @type {Array} Filtered books on the 'wantToRead' shelf. */
        const wantToRead = filterBooksListByShelfId(booksList, 'wantToRead');

        /**
         * After successfully fetching the 'booksList', update the component's state with the
         * updated shelves and their 'booksList.'
         */
        this.setState({
          shelves: {
            currentlyReading: {
              title: this.props.shelfTitles.currentlyReading,
              booksList: currentlyReading,
            },
            wantToRead: {
              title: this.props.shelfTitles.wantToRead,
              booksList: wantToRead,
            },
            read: {
              title: this.props.shelfTitles.read,
              booksList: read,
            },
          },
        });
      })
      .catch((err) => {
        throw new UndefinedBooksListException();
      });

    return null;
  }

  renderBookShelves() {
    const { shelves, } = this.state;

    if (!isEmpty(shelves)) {
      /**
       * Render a BookShelf for each of the shelves in the current component's state
       */
      return Object.keys(shelves).map(idx => (
        <BookShelf
          {...shelves[idx]}
          key={shortid.generate()}
          onShelfChange={this.onShelfChange}
        />
      ));
    }

    return null;
  }

  renderTitle() {
    if (this.props.title) {
      return (
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="list-books">
        {this.renderTitle()}
        <div className="list-books-content">
          <div>
            {this.renderBookShelves()}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

MyReads.propTypes = {
  title: PropTypes.string,
  shelfTitles: PropTypes.object,
};

MyReads.defaultProps = {
  title: 'Zain\'s Reads',
  shelfTitles: {
    currentlyReading: 'Currently Enjoy Reading',
    wantToRead: 'I Want to Read',
    read: 'I\'ve Already Read',
  },
};

export default MyReads;
