import PropTypes from 'prop-types';
import React from 'react';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';

/**
 * Update the query value and send it back via a props 'getQuery()' function call
 * @param  {string}        query The searched query
 * @param  {Function}       getQuery The callback function
 * @return {Function|null}
 */
const updateQuery = (query, getQuery) => (
  getQuery &&
  typeof getQuery === 'function' ?
  getQuery(query) : null
);

/**
 * Render a search bar
 * @param  {string}   options.closeSearchURL  Where should the 'close' search button take you
 * @param  {number}   options.debounceSeconds The number of seconds to debounce the fetch query call
 * @param  {string}   options.placeholder     The placeholder for the search bar
 * @param  {Function} options.getQuery        The callback function to pass back the user typed query
 * @param  {Object}   options                 The props for the SearchBar component
 * @return {JSX}
 */
const SearchBar = ({ closeSearchURL, debounceSeconds, placeholder, getQuery, }) => {
  // Temper the frequency the 'updateQuery' event fires based on the given 'debounceSeconds'.
  const debouncedUpdateQuery = debounce(updateQuery, debounceSeconds);

  return (
    <div className="search-bar">
      <Link to={closeSearchURL} className="close-search">
        Close
      </Link>
      <div className="search-input-wrapper">
        <input
          onChange={(e) => debouncedUpdateQuery(e.target.value, getQuery)}
          placeholder={placeholder}
          type="text"
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  closeSearchURL: PropTypes.string,
  getQuery: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  debounceSeconds: PropTypes.number,
};

SearchBar.defaultProps = {
  closeSearchURL: '/',
  placeholder: '',
  debounceSeconds: 200,
};

export default SearchBar;
