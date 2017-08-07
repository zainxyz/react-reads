import PropTypes from 'prop-types';
import React from 'react';

const SpinnerText = ({ color, style, text, }) => (
  <p style={{ color, ...style, }}>{text}</p>
);

SpinnerText.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

SpinnerText.defaultProps = {
  color: '',
  style: {
    lineHeight: '1.5',
    margin: 0,
  },
};

export default SpinnerText;
