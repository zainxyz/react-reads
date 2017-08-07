import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SelectList from '../../common/selectList';
import { moveBookToShelf } from '../../common/api/BooksAPI';

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shelf: props.shelf,
    };

    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(value) {
    this.updateBook(value);
    this.setState({ shelf: value, });
  }

  getAuthors() {
    let authors = this.props.authors;

    if (
      this.props.authors &&
      Array.isArray(this.props.authors) &&
      !isEmpty(this.props.authors)
    ) {
      authors = this.props.authors.reduce((res, author) =>
        (
          res ? `${res}, ${author}` : `${author}`
        ),
        ''
      );
    }

    return authors;
  }

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

  updateBook(shelfId) {
    moveBookToShelf(this.props.id, shelfId)
      .then(res => this.props.onShelfChange(res));
  }

  renderBookCover() {
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
