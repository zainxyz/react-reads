import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SelectList from '../../common/selectList';
import { moveBookToShelf } from '../../common/api/BooksAPI';
import { transformArrayIntoString } from '../../common/utils/arrayUtils';

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
   * @param  {string} shelfId The id of the new shelf
   */
  onSelectChange(shelfId) {
    this.updateBook(shelfId);
    this.setState({ shelf: shelfId, });
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
   * @param  {string} shelfId The id of the new shelf
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
    const { title, imageLinks, style, subtitle, } = this.props;

    // Build the styles for the book cover.
    // TODO: Move styles to a higher up config.
    const bookCoverStyles = {
      ...style.bookCover,
    };

    // Create the image source link
    const imgSrc =
      imageLinks &&
      imageLinks.thumbnail ?
      imageLinks.thumbnail : '';

    // Build the alternate text for the image
    let altText = `Book: ${title}`;

    // Append the 'subtitle' of the book (to the altText) if one is present
    if (!isEmpty(subtitle)) {
      altText = `${altText} (${subtitle})`;
    }

    return (
      <img
        alt={altText}
        className="book-cover"
        style={bookCoverStyles}
        title={title}
        src={imgSrc}
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

  renderDetailsLink() {
    const { id, viewDetailsLink, } = this.props;

    if (viewDetailsLink) {
      return (
        <Link
          className="nav-link book-details-link"
          to={`/book/${id}`}
        >
          View Details
        </Link>
      );
    }

    return null;
  }

  render() {
    const { authors, } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          {this.renderBookCover()}
          {this.renderBookShelfChanger()}
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{transformArrayIntoString(authors)}</div>
        <div className="book-details">{this.renderDetailsLink()}</div>
      </div>
    );
  }
}

Book.propTypes = {
  authors: PropTypes.array,
  id: PropTypes.string.isRequired,
  imageLinks: PropTypes.object,
  onShelfChange: PropTypes.func,
  shelf: PropTypes.string,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  viewDetailsLink: PropTypes.bool,
};

Book.defaultProps = {
  authors: [],
  imageLinks: {},
  onShelfChange: () => {},
  shelf: '',
  style: {
    bookCover: {
      width: '128px',
      height: '193px',
    },
  },
  subtitle: '',
  viewDetailsLink: false,
  title: '',
};

export default Book;
