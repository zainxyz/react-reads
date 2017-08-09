import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import BookShelf from 'common/bookShelf';
import Spinner from 'common/loading';
import { constants as bookConstants } from 'common/book';
import { filterBooksListByShelfId } from 'utils/bookUtils';

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
  }

  componentDidMount() {
    // Make sure we jump to the top of the page.
    window.scrollTo(0, 0);
    // Create bookshelves for our MyReads library
    this.createBookShelves(this.props.booksList);
  }

  componentWillReceiveProps(nextProps) {
    // Create bookshelves for our MyReads library
    this.createBookShelves(nextProps.booksList);
  }

  /**
   * Create bookshelves for our MyReads Library
   * @param  {Array} booksList The list of books
   */
  createBookShelves(booksList) {
    // Filtered books on the 'currentlyReading' shelf.
    const currentlyReading = filterBooksListByShelfId(booksList, 'currentlyReading');
    // Filtered books on the 'read' shelf.
    const read = filterBooksListByShelfId(booksList, 'read');
    // Filtered books on the 'wantToRead' shelf.
    const wantToRead = filterBooksListByShelfId(booksList, 'wantToRead');

    if (!isEmpty(booksList)) {
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
    }
  }

  renderBookShelves() {
    const { shelves, } = this.state;

    if (!isEmpty(shelves)) {
      // Render a BookShelf for each of the shelves in the current component's state
      return Object.keys(shelves).map(idx => (
        <BookShelf
          {...shelves[idx]}
          key={shortid.generate()}
          onShelfChange={this.props.onShelfChange}
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
  booksList: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func,
  spinner: PropTypes.object,
  title: PropTypes.string,
};

MyReads.defaultProps = {
  onShelfChange: () => {},
  spinner: {
    style: {
      marginTop: '200px',
    },
  },
  title: 'MyReads Library',
};

export default MyReads;
