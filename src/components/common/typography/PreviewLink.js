import PropTypes from 'prop-types';
import React from 'react';

/**
 * A preview link component for linking the user to a given href (page)
 * @param  {string} options.alt         The alt attribute
 * @param  {string} [options.className] Optional class names
 * @param  {string} options.href        The final destination url
 * @param  {string} [options.target]    Optional target attribute
 * @param  {string} options.text        The text to be displayed to the user
 * @param  {Object} options             The component's params
 * @return {JSX}
 */
const PreviewLink = ({ alt, className, href, target, text, }) => (
  <a
    alt={alt}
    className={`preview-link ${className}`}
    href={href}
    target="_blank"
  >
    {text}
  </a>
);

PreviewLink.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  text: PropTypes.string.isRequired,
};

PreviewLink.defaultProps = {
  alt: '',
  className: '',
  target: null,
};

export default PreviewLink;
