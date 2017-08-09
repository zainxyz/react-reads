import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BooksGrid from 'common/booksGrid';
import HelpText from 'common/helpText';
import SearchBar from 'common/searchBar';
import Spinner from 'common/loading';
import { mergeOldAndNewListsByKey } from 'utils/arrayUtils';
import { searchBooks } from 'api/booksAPI';

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

  componentWillUnmount() {
    // Calling the parent's 'refetchAllBooks' to re-fetch the books upon an un-mounting.
    this.props.refetchAllBooks(this.state.fetchedBooks);
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
          const updatedBooksList = mergeOldAndNewListsByKey(originalBooksList, booksList, 'id');

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
   * Render a search bar atop the current page
   * @return {JSX}
   */
  renderSearchBar() {
    return (
      <SearchBar
        closeSearchURL={this.props.closeSearchURL}
        getQuery={this.fetchBooksByQuery}
        placeholder={this.props.placeholder}
        throttleSeconds={this.props.throttleSeconds}
      />
    );
  }

  /**
   * Render a books grid for the fetched books
   * @return {JSX}
   */
  renderSearchedBooksGrid() {
    const { fetchedBooks, isLoading, loadingText, } = this.state;

    // Display the loading spinner if we're currently fetching the books via the provided query
    if (isLoading) {
      return <Spinner {...this.props.spinner} text={loadingText} />;
    }

    // If we have finished fetching the books, and the fetchedBooks list isn't empty then
    // display the BooksGrid.
    if (!isLoading && !isEmpty(fetchedBooks)) {
      return (
        <BooksGrid
          booksList={fetchedBooks}
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
        <HelpText text={this.props.noBooksFoundText} />
      );
    }

    // If the fetchedBooks list is null, meaning a search hasn't taken place, then display the user
    // the beginning, 'Start by typing...' text
    if (fetchedBooks === null) {
      return (
        <HelpText text={this.props.startTypingText} />
      );
    }

    return null;
  }

  render() {
    return (
      <div className="books-search-wrapper">
        {this.renderSearchBar()}
        <div className="search-results">
          {this.renderSearchedBooksGrid()}
        </div>
      </div>
    );
  }
}

BookSearch.propTypes = {
  closeSearchURL: PropTypes.string,
  noBooksFoundText: PropTypes.array,
  refetchAllBooks: PropTypes.func,
  originalBooksList: PropTypes.array,
  placeholder: PropTypes.string,
  spinner: PropTypes.object,
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
  refetchAllBooks: () => {},
  originalBooksList: [],
  placeholder: '',
  spinner: {
    fillColor: '#F00B42', // FOOBAR
    textColor: '#F00B42', // FOOBAR
    style: {
      marginTop: '200px',
    },
  },
  startTypingText: [
    'Start by typing in the search field above...'
  ],
  throttleSeconds: 1200,
};

export default BookSearch;
