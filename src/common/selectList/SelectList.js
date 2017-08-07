import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';

import SelectListOption from './SelectListOption';

/**
 * Class for rendering a select list drop-down based on the number of passed-in select options
 * @class
 * @extends {Component}
 */
class SelectList extends Component {
  constructor(props) {
    super(props);

    // Bindings to 'this'
    this.onBlur = this.onBlur.bind(this);
  }

  /**
   * Upon each successful change of the select option call the passed-in 'onBlur()'
   * @param  {Event}                e The event
   * @return {Function|null}
   */
  onBlur(e) {
    if (
      this.props.onBlur &&
      typeof this.props.onBlur === 'function'
    ) {
      this.props.onBlur(e.target.value);
    }
    return null;
  }

  /**
   * Render all of the passed-in select list's options
   * @return {JSX}
   */
  renderOptions() {
    const { options, } = this.props;

    if (!isEmpty(options)) {
      return options.map(option => (
        <SelectListOption
          disabled={option.disabled}
          key={shortid.generate()}
          selected={option.selected}
          value={option.value}
        >
          {option.label}
        </SelectListOption>
      ));
    }

    return null;
  }

  render() {
    let defaultValue = this.props.defaultValue;

    if (!defaultValue) {
      defaultValue = 'Select One';
    }

    return (
      <select
        onChange={this.onBlur}
        value={this.props.value}
      >
        <SelectListOption disabled value="">
          {defaultValue}
        </SelectListOption>
        {this.renderOptions()}
      </select>
    );
  }
}

SelectList.propTypes = {
  defaultValue: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
};

SelectList.defaultProps = {
  defaultValue: '',
  value: '',
};

export default SelectList;
