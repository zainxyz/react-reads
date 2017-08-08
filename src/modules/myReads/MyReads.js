import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import BookShelf from '../../common/bookShelf';
import Spinner from '../../common/loading';
import UndefinedBooksListException from './UndefinedBooksListException';
import { constants as bookConstants } from '../../common/book';
import { filterBooksListByShelfId } from '../../utils/bookUtils';
import { getAllBooks } from '../../api/booksAPI';

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
      isLoading: true,
      loadingText: 'Fetching books...',
    };

    // Bindings to 'this'
    this.onShelfChange = this.onShelfChange.bind(this);
  }

  componentDidMount() {
    // Make sure we jump to the top of the page.
    window.scrollTo(0, 0);

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
        // This is the final booksList coming back from the API fetch call.
        const booksList = res.books ? res.books : [];
        // Filtered books on the 'currentlyReading' shelf.
        const currentlyReading = filterBooksListByShelfId(booksList, 'currentlyReading');
        // Filtered books on the 'read' shelf.
        const read = filterBooksListByShelfId(booksList, 'read');
        // Filtered books on the 'wantToRead' shelf.
        const wantToRead = filterBooksListByShelfId(booksList, 'wantToRead');

        // After successfully fetching the 'booksList', update the component's state with the
        // updated shelves and their 'booksList.'
        this.setState({
          shelves: {
            currentlyReading: {
              title: bookConstants.SHELF_TITLES_MAP.currentlyReading,
              booksList: currentlyReading,
            },
            wantToRead: {
              title: bookConstants.SHELF_TITLES_MAP.wantToRead,
              booksList: wantToRead,
            },
            read: {
              title: bookConstants.SHELF_TITLES_MAP.read,
              booksList: read,
            },
          },
          isLoading: false,
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
      // Render a BookShelf for each of the shelves in the current component's state
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
        <div className="page-title">
          <h1>{this.props.title}</h1>
        </div>
      );
    }

    return null;
  }

  render() {
    if (!this.state.isLoading) {
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

    return <Spinner {...this.props.spinner} text={this.state.loadingText} />;
  }
}

MyReads.propTypes = {
  spinner: PropTypes.object,
  title: PropTypes.string,
};

MyReads.defaultProps = {
  spinner: {
    style: {
      marginTop: '200px',
    },
  },
  title: 'Zain\'s Reads',
};

export default MyReads;
