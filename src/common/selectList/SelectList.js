import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';

import SelectListOption from './SelectListOption';

/**
 * Render a select-list drop-down based on the number of passed in options
 * @param  {string}   options.defaultValue The default value of the select-list
 * @param  {Function} options.onBlur       The callback for the select-list
 * @param  {Array}    options.options      A list of select-list options
 * @param  {string}   options.value        The current value of the select-list
 * @param  {Object}   options              The props for the SelectList component
 * @return {JSX}
 */
const SelectList = ({ defaultValue, onBlur, options, value, }) => (
  <select
    onChange={(e) => onBlur(e.target.value)}
    value={value}
  >
    <SelectListOption disabled value="">
      {defaultValue}
    </SelectListOption>
    {
      !isEmpty(options) &&
      options.map(option => (
        <SelectListOption
          disabled={option.disabled}
          key={shortid.generate()}
          selected={option.selected}
          value={option.value}
        >
          {option.label}
        </SelectListOption>
      ))
    }
  </select>
);

SelectList.propTypes = {
  defaultValue: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
};

SelectList.defaultProps = {
  defaultValue: 'Select One',
  onBlur: () => {},
  value: '',
};

export default SelectList;
