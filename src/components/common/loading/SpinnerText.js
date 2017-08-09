import PropTypes from 'prop-types';
import React from 'react';

/**
 * Render the spinner's text.
 *
 * This could have lived inside the Spinner component's file, but in future we might
 * want to further control the text that gets displayed underneath the spinner, or
 * change it out for a completely different component. This way the text is isolated and
 * lives alongside the Spinner component.
 *
 * @param  {string} options.color The color for the text
 * @param  {Object} options.style The styles for the text
 * @param  {string} options.text  The text to be displayed
 * @param  {Object} options       The props for the SpinnerText component
 * @return {JSX}
 */
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
