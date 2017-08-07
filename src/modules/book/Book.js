import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SelectList from '../../common/selectList';
import { moveBookToShelf } from '../../common/api/BooksAPI';

/**
 * Class to render a single Book
 * @class
 * @extends {Component}
 */
class Book extends Component {
  constructor(props) {
    super(props);

    // Set the initial state
    this.state = {
      shelf: props.shelf,
    };

    // Bindings to 'this'
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  /**
   * On change of each of the book's shelf name (shelfId)
   * @param  {String} shelfId The id of the new shelf
   */
  onSelectChange(shelfId) {
    this.updateBook(shelfId);
    this.setState({ shelf: shelfId, });
  }

  /**
   * Convert the given list of authors into a single string for better readability
   * @return {String|null}
   */
  getAuthors() {
    const { authors, } = this.props;

    if (!isEmpty(authors)) {
      return authors.reduce((res, author) =>
        (
          res ? `${res}, ${author}` : `${author}`
        ),
        ''
      );
    }

    return null;
  }

  /**
   * Get the select options for the drop-down.
   * TODO: For now these options reside in this (Book) class, maybe in future these can be
   * dynamically generated based on a list of available bookShelf Ids?
   * @return {Array}
   */
  getSelectOptions() {
    return [
      {
        "value": "currentlyReading",
        "label": "Currently Reading",
      },
      {
        "value": "wantToRead",
        "label": "Want to Read",
      },
      {
        "value": "read",
        "label": "Read",
      },
      {
        "value": "none",
        "label": "None",
      }
    ];
  }

  /**
   * Update the book - to - shelf association
   * @param  {String} shelfId The id of the new shelf
   */
  updateBook(shelfId) {
    moveBookToShelf(this.props.id, shelfId)
      .then(res => this.props.onShelfChange(res));
  }

  /**
   * Render the book covers
   * @return {JSX}
   */
  renderBookCover() {
    /**
     * Build the styles for the book cover.
     * TODO: Move styles to a higher up config.
     * @type {Object}
     */
    const bookCoverStyles = {
      ...this.props.style.bookCover,
      backgroundImage: `url(${this.props.imageLinks.thumbnail})`,
    };

    return (
      <div
        className="book-cover"
        style={bookCoverStyles}
      />
    );
  }

  /**
   * Render a book shelf changer (a simple select input)
   * @return {JSX}
   */
  renderBookShelfChanger() {
    return (
      <div className="book-shelf-changer">
        <SelectList
          defaultValue="Move to shelf..."
          onBlur={this.onSelectChange}
          options={this.getSelectOptions()}
          value={this.state.shelf}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          {this.renderBookCover()}
          {this.renderBookShelfChanger()}
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.getAuthors()}</div>
      </div>
    );
  }
}

Book.propTypes = {
  authors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  id: PropTypes.string.isRequired,
  imageLinks: PropTypes.object,
  onShelfChange: PropTypes.func,
  shelf: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
};

Book.defaultProps = {
  authors: '',
  imageLinks: {},
  onShelfChange: () => {},
  shelf: '',
  style: {
    bookCover: {
      width: '128px',
      height: '193px',
    },
  },
  title: '',
};

export default Book;
