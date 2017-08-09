import PropTypes from 'prop-types';
import React from 'react';

/**
 * A component for building the page title with an optional sub-title
 * @param  {string} [options.className] Optional class name
 * @param  {string} options.title       The required title for the section heading
 * @param  {string} [options.subtitle]  Optional sub title
 * @param  {Object} options             The component's props
 * @return {JSX}
 */
const PageTitle = ({ className, title, subTitle, }) => (
  <div className={`page-title ${className}`}>
    <h1>{title}</h1>
    {
      subTitle &&
      <p>{subTitle}</p>
    }
  </div>
);

PageTitle.propTypes = {
  className: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

PageTitle.defaultProps = {
  className: '',
  subTitle: '',
};

export default PageTitle;
