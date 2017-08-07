import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';

import SelectListOption from './SelectListOption';

class SelectList extends Component {
  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    if (
      this.props.onBlur &&
      typeof this.props.onBlur === 'function'
    ) {
      this.props.onBlur(e.target.value);
    }
    return null;
  }

  renderOptions() {
    if (
      this.props.options &&
      Array.isArray(this.props.options)
    ) {
      return this.props.options.map(option => (
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
