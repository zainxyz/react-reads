import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SelectList from '../../common/selectList';

class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.category,
    };

    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(value) {
    this.setState({ category: value, });
  }

  getAuthors() {
    let authors = this.props.authors;

    if (
      this.props.authors &&
      Array.isArray(this.props.authors)
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

  renderBookCover() {
    const bookCoverStyles = {
      ...this.props.style.bookCover,
      backgroundImage: `url(${this.props.bookCoverURL})`,
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
          defaultValue="omg yes this is it!"
          onBlur={this.onSelectChange}
          options={this.getSelectOptions()}
          value={this.state.category}
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
  bookCoverURL: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
};

Book.defaultProps = {
  authors: '',
  bookCoverURL: '',
  category: '',
  style: {
    bookCover: {
      width: '128px',
      height: '193px',
    },
  },
  title: '',
};

export default Book;
