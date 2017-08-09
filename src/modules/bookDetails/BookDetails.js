import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DetailsList from 'common/detailsList';
import HomeIcon from 'common/icons/HomeIcon';
import Spinner from 'common/loading';
import { constants as bookConstants } from 'common/book';
import { formatDate } from 'utils/dateUtils';
import { getBookById } from 'api/booksAPI';
import { PageTitle } from 'common/typography';
import { PreviewLink } from 'common/links';
import { transformArrayIntoString } from 'utils/arrayUtils';
import {
  buildBookCoverImageUrl,
  getBookISBN,
  translateBookShelfName,
} from 'utils/bookUtils';

import UndefinedBookDetailsException from './UndefinedBookDetailsException';

/**
 * Class for displaying details about a selected book
 * @class
 * @extends {Component}
 */
class BookDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {},
      isLoading: true,
      loadingText: 'Fetching book details...',
    };
  }

  componentDidMount() {
    const { match: { params: { bookId, }, }, } = this.props;

    // Make sure we jump to the top of the page.
    window.scrollTo(0, 0);

    if (!isEmpty(bookId)) {
      getBookById(bookId)
        .then((res) => {
          if (!isEmpty(res) &&
            !isEmpty(res.book)
          ) {
            this.setState({
              book: res.book,
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
              loadingText: 'Unable to retrieve book details, try refreshing the page',
            });
          }
        })
        .catch(() => {
          throw new UndefinedBookDetailsException();
        });
    }
  }

  renderDetailsHeader() {
    const { book, } = this.state;
    const author = transformArrayIntoString(book.authors);

    if (book.title) {
      return (
        <PageTitle
          title={book.title}
          subTitle={`by: ${author}`}
        />
      );
    }
    return null;
  }

  renderBookImage(book) {
    const { id, title, } = book;
    const thumbnailUrl = buildBookCoverImageUrl(id, 7);

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
      subtitle: book.subtitle,
      categories: transformArrayIntoString(book.categories),
      shelf: translateBookShelfName(book.shelf, bookConstants.SHELF_TITLES_MAP),
      publishedDate: formatDate(
        book.publishedDate,
        'YYYY-MM-DD',
        'LL'
      ),
      ISBN_13: getBookISBN(book.industryIdentifiers, 'ISBN_13'),
    };

    return (
      <DetailsList
        data={data}
        definitions={definitions}
      />
    );
  }

  renderBookDetailsHeader() {
    return (
      <div className="book-info__header">
        <HomeIcon />
        <Link to="/" className="nav-link">Return Home</Link>
      </div>
    );
  }

  renderBookInfo() {
    const { book, } = this.state;

    return (
      <div className="book-info">
        {this.renderBookDetailsHeader()}
        <div className="book-info__image">
          {this.renderBookImage(book)}
        </div>
        <div className="book-info__details">
          {this.renderBookDetails(book)}
          {this.renderPreviewLink(book)}
        </div>
      </div>
    );
  }

  renderPreviewLink(book) {
    return (
      <PreviewLink
        alt={`Preview - ${book.title}`}
        className="nav-link"
        href={book.previewLink}
        target="_blank"
        text="Preview Book on Google"
      />
    );
  }

  render() {
    const { style, spinner, } = this.props;
    const { isLoading, loadingText, } = this.state;

    if (!isLoading) {
      return (
        <div style={style} className="book-details">
          {this.renderDetailsHeader()}
          <div className="book-details__info">
            {this.renderBookInfo()}
          </div>
        </div>
      );
    }

    return <Spinner {...spinner} text={loadingText} />;
  }
}

BookDetails.propTypes = {
  definitions: PropTypes.array,
  match: PropTypes.object.isRequired,
  spinner: PropTypes.object,
  style: PropTypes.object,
};

BookDetails.defaultProps = {
  style: {},
  spinner: {
    style: {
      marginTop: '100px',
    },
  },
  // NOTE: Disabling the eslint setting for 'no-template-curly-in-string' since the
  // textReplacement() method requires the stringToBeReplaced to be inside template curly brackets.
  /* eslint no-template-curly-in-string: "off" */
  definitions: [
    {
      label: 'Subtitle',
      valueTemplate: '${subtitle}',
    },
    {
      label: 'ISBN (13)',
      valueTemplate: '${ISBN_13}',
    },
    {
      label: 'Description',
      valueTemplate: '${description}',
    },
    {
      label: 'On BookShelf',
      valueTemplate: '${shelf}',
    },
    {
      label: 'Publisher',
      valueTemplate: '${publisher}',
    },
    {
      label: 'Published Date',
      valueTemplate: '${publishedDate}',
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
