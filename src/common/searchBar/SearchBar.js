import PropTypes from 'prop-types';
import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import { Link } from 'react-router-dom';

/**
 * A generic search-bar that outputs the user's typed in value via a getQuery() function call,
 * which gets throttled based on the desired throttle value (in seconds).
 * @class
 * @extends {Component}
 */
class SearchBar extends Component {
  constructor(props) {
    super(props);

    // Throttle the updateQuery function to be only run every couple of seconds (or milliseconds)
    this.updateQuery = throttle(this.updateQuery, props.throttleSeconds);
  }

  /**
   * Update the query value and send it back via a props 'getQuery()' function call
   * @param  {string}        query The searched query
   * @return {Function|null}
   */
  updateQuery(query) {
    if (
      this.props.getQuery &&
      typeof this.props.getQuery === 'function'
    ) {
      this.props.getQuery(query);
    }
    return null;
  }

  /**
   * Render the search input for the user
   * @return {JSX}
   */
  renderSearchInput() {
    return (
      <div className="search-input-wrapper">
        <input
          onChange={(e) => this.updateQuery(e.target.value)}
          placeholder={this.props.placeholder}
          type="text"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="search-bar">
        <Link to={this.props.closeSearchURL} className="close-search">
          Close
        </Link>
        {this.renderSearchInput()}
      </div>
    );
  }
}

SearchBar.propTypes = {
  closeSearchURL: PropTypes.string,
  getQuery: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  throttleSeconds: PropTypes.number,
};

SearchBar.defaultProps = {
  closeSearchURL: '/',
  placeholder: '',
  throttleSeconds: 1000,
};

export default SearchBar;
