import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import * as bookConstants from 'constants/book';
import BookShelf from 'components/common/books/BookShelf';
import PageTitle from 'components/common/typography/PageTitle';
import Spinner from 'components/common/loading/Spinner';
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
    const { title, } = this.props;

    if (title) {
      return (
        <PageTitle title={title} />
      );
    }

    return null;
  }

  render() {
    const { isLoading, loadingText, } = this.state;

    return (
      <div className="list-books">
        {
          !isLoading &&
          this.renderTitle()
        }
        {
          !isLoading &&
          <div className="list-books-content">
            <div>
              {this.renderBookShelves()}
            </div>
          </div>
        }
        {
          !isLoading &&
          <div className="open-search">
            <Link to="/search">
              Add a book
            </Link>
          </div>
        }
        {
          isLoading &&
          <Spinner text={loadingText} />
        }
      </div>
    );
  }
}

MyReads.propTypes = {
  booksList: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func,
  title: PropTypes.string,
};

MyReads.defaultProps = {
  onShelfChange: () => {},
  title: 'MyReads Library',
};

export default MyReads;
