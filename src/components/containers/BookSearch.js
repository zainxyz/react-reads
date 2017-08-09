import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BookGrid from 'components/common/books/BookGrid';
import HelpText from 'components/common/typography/HelpText';
import SearchBar from 'components/common/search/SearchBar';
import Spinner from 'components/common/loading/Spinner';
import { searchBooks } from 'api/booksAPI';

/**
 * Update all of the shelves in the new list of books with the old list of books if there is a match found
 * @param  {Array} oldList The old book list
 * @param  {Array} newList The new book list
 * @return {Array}
 */
const updateAllShelves = (oldList, newList) => {
  if (Array.isArray(newList)) {
    return newList.map((book, idx) => {
      const bookCopy = {
        ...book,
      };
      const match = oldList.find(item => item.id === bookCopy.id);

      if (!isEmpty(match)) {
        bookCopy.shelf = match.shelf;
      } else {
        bookCopy.shelf = '';
      }

      return bookCopy;
    });
  }
  return [];
};

/**
 * Class for searching for a book given a search term
 * @class
 * @extends {Component}
 */
class BookSearch extends Component {
  constructor(props) {
    super(props);

    // Setting the default state
    this.state = {
      fetchedBooks: null,
      isLoading: false,
      loadingText: 'Fetching books...',
    };

    // Bindings to 'this'
    this.fetchBooksByQuery = this.fetchBooksByQuery.bind(this);
  }

  componentDidMount() {
    // Make sure we jump to the top of the page.
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { originalBooksList, } = nextProps;
    const { fetchedBooks, } = this.state;
    const updatedBooksList = updateAllShelves(originalBooksList, fetchedBooks);

    if (!isEmpty(fetchedBooks)) {
      this.setState({ fetchedBooks: updatedBooksList, });
    }
  }

  /**
   * Fetch a list of books based on the given query
   * @param  {string}        query The given query to search
   * @return {Function|null}
   */
  fetchBooksByQuery(query) {
    if (query) {
      this.setState({ isLoading: true, });
      searchBooks(query, 10)
        .then(res => {
          const booksList = res.books ? res.books : [];
          const { originalBooksList, } = this.props;
          const updatedBooksList = updateAllShelves(originalBooksList, booksList);

          if (!isEmpty(updatedBooksList)) {
            this.setState({ fetchedBooks: updatedBooksList, isLoading: false, });
          } else {
            this.setState({ fetchedBooks: [], isLoading: false, });
          }
        });
    } else if (query === '') {
      this.setState({ fetchedBooks: null, isLoading: false, });
    }

    return null;
  }

  /**
   * Render a books grid for the fetched books
   * @return {JSX}
   */
  renderSearchedBookGrid() {
    const { fetchedBooks, isLoading, loadingText, } = this.state;
    const { fetchAllBooks, noBooksFoundText, startTypingText, } = this.props;

    // Display the loading spinner if we're currently fetching the books via the provided query
    if (isLoading) {
      return <Spinner text={loadingText} />;
    }

    // If we have finished fetching the books, and the fetchedBooks list isn't empty then
    // display the BookGrid.
    if (!isLoading && !isEmpty(fetchedBooks)) {
      return (
        <BookGrid
          booksList={fetchedBooks}
          onShelfChange={fetchAllBooks}
          viewDetailsLink
        />
      );
    }

    // If the fetchedBooks list is an empty array, then that means we were not successful in fetching
    // the list of books based on the given query
    if (
      Array.isArray(fetchedBooks) &&
      fetchedBooks !== null
    ) {
      return (
        <HelpText text={noBooksFoundText} />
      );
    }

    // If the fetchedBooks list is null, meaning a search hasn't taken place, then display the user
    // the beginning, 'Start by typing...' text
    if (fetchedBooks === null) {
      return (
        <HelpText text={startTypingText} />
      );
    }

    return null;
  }

  render() {
    return (
      <div className="books-search">
        <SearchBar
          closeSearchURL={this.props.closeSearchURL}
          getQuery={this.fetchBooksByQuery}
          placeholder={this.props.placeholder}
          throttleSeconds={this.props.throttleSeconds}
        />
        <div className="search-results">
          {this.renderSearchedBookGrid()}
        </div>
      </div>
    );
  }
}

BookSearch.propTypes = {
  closeSearchURL: PropTypes.string,
  noBooksFoundText: PropTypes.array,
  fetchAllBooks: PropTypes.func,
  originalBooksList: PropTypes.array,
  placeholder: PropTypes.string,
  startTypingText: PropTypes.array,
  throttleSeconds: PropTypes.number,
};

BookSearch.defaultProps = {
  closeSearchURL: '',
  noBooksFoundText: [
    'Either your search term was off, or we were unable to find books for that search query.',
    'Please try searching again...',
    'Acceptable search terms are the following:',
    "'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'"
  ],
  fetchAllBooks: () => {},
  originalBooksList: [],
  placeholder: '',
  startTypingText: [
    'Start by typing in the search field above...'
  ],
  throttleSeconds: 1200,
};

export default BookSearch;
