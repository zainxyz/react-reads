import PropTypes from 'prop-types';
import React from 'react';

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
