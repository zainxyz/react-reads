import PropTypes from 'prop-types';
import React from 'react';

/**
 * A component for building the section headers
 * @param  {string} options.className] Optional class name
 * @param  {string} options.title       The required title for the section heading
 * @param  {Object} options.            The component's props
 * @return {JSX}
 */
const SectionHeader = ({ className, title, }) => (
  <h2 className={`section-header ${className}`}>{title}</h2>
);

SectionHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

SectionHeader.defaultProps = {
  className: '',
};

export default SectionHeader;
