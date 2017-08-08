import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DetailsList from '../../common/detailsList';
import { getBookById } from '../../common/api/BooksAPI';
import { transformArrayIntoString } from '../../common/utils/arrayUtils';
import { buildBookImageUrl } from '../../common/utils/bookUtils';

class BookDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {},
    };
  }

  componentDidMount() {
    const { match: { params: { bookId, }, }, } = this.props;

    if (!isEmpty(bookId)) {
      getBookById(bookId)
        .then((res) => {
          if (!isEmpty(res) &&
            !isEmpty(res.book)
          ) {
            this.setState({ book: res.book, });
          }
        })
        .catch(err => console.error('getBookById : error : ', err));
    }
  }

  renderDetailsHeader() {
    const { book, } = this.state;
    const author = transformArrayIntoString(book.authors);

    if (book.title) {
      return (
        <div className="page-title">
          <h1>{book.title}</h1>
          <p>{`by: ${author}`}</p>
        </div>
      );
    }
    return null;
  }

  renderBookImage(book) {
    const { id, title, } = book;
    const thumbnailUrl = buildBookImageUrl(id, 7);

    return (
      <img
        alt={title}
        src={thumbnailUrl}
        title={title}
      />
    );
  }

  renderBookDetails(book) {
    const { definitions, } = this.props;
    const data = {
      ...book,
      subtitle: transformArrayIntoString(book.subtitle),
      categories: transformArrayIntoString(book.categories),
    };

    console.log('data : ', data);
    console.log('definitions : ', definitions);

    return (
      <DetailsList
        data={data}
        definitions={definitions}
      />
    );
  }

  renderBookInfo() {
    const { book, } = this.state;

    return (
      <div className="book-info">
        <div className="book-info__image">
          {this.renderBookImage(book)}
        </div>
        <div className="book-info__details">
          {this.renderBookDetails(book)}
        </div>
      </div>
    );
  }

  render() {
    const { style, } = this.props;

    return (
      <div style={style} className="book-details">
        {this.renderDetailsHeader()}
        <div className="book-details__info">
          {this.renderBookInfo()}
        </div>
      </div>
    );
  }
}

BookDetails.propTypes = {
  definitions: PropTypes.array,
  match: PropTypes.object.isRequired,
  style: PropTypes.object,
};

BookDetails.defaultProps = {
  style: {},
  definitions: [
    {
      label: 'Subtitle',
      valueTemplate: '${subtitle}',
    },
    {
      label: 'Description',
      valueTemplate: '${description}',
    },
    {
      label: 'Publisher',
      valueTemplate: '${publisher}',
    },
    {
      label: 'Page Count',
      valueTemplate: '${pageCount}',
    },
    {
      label: 'Language',
      valueTemplate: '${language}',
    },
    {
      label: 'Categories',
      valueTemplate: '${categories}',
    }
  ],
};

export default BookDetails;
