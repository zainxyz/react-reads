import PropTypes from 'prop-types';
import React, { Component } from 'react';
import throttle from 'lodash/throttle';

/**
 * A generic search-bar that outputs the user's typed in value via a getQuery() function call,
 * which gets throttled based on the desired throttle value (in seconds).
 * @class
 * @extends {Component}
 */
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.updateQuery = throttle(this.updateQuery, props.throttleSeconds);
  }

  updateQuery(query) {
    if (
      this.props.getQuery &&
      typeof this.props.getQuery === 'function'
    ) {
      this.props.getQuery(query);
    }
    return null;
  }

  renderSearchInput() {
    return (
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder={this.props.placeholder}
          onChange={(e) => this.updateQuery(e.target.value)}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="search-bar">
        <a className="close-search" onClick={() => this.setState({ showSearchPage: false, })}>Close</a>
        {this.renderSearchInput()}
      </div>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  getQuery: PropTypes.func.isRequired,
  throttleSeconds: PropTypes.number,
};

SearchBar.defaultProps = {
  placeholder: '',
  throttleSeconds: 1000,
};

export default SearchBar;
