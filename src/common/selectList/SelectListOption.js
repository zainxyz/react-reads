import PropTypes from 'prop-types';
import React from 'react';

/**
 * Render a single select drop-down option
 * @param  {Node}    options.children The passed in children
 * @param  {Boolean} options.disabled Availability of the select option
 * @param  {String}  options.value    User displayed value of the select option
 * @return {JSX}
 */
const SelectListOption = ({
  children,
  disabled,
  value,
}) => (
  <option
    disabled={disabled}
    value={value}
  >
    {children}
  </option>
);

SelectListOption.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};

SelectListOption.defaultProps = {
  disabled: false,
  value: '',
};

export default SelectListOption;
