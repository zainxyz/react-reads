import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Render a single details list item
 * @param  {string} options.label The label for the list item
 * @param  {string} options.value The value for the list item
 * @param  {Object} options       The props for the DetailsListItem component
 * @return {JSX}
 */
const DetailsListItem = ({ label, value, }) => (!isEmpty(value) ?
  (
    <li className="details-list__item">
      {
        !isEmpty(label) &&
        <p>{label}</p>
      }
      <p>{value}</p>
    </li>
  ) : null
);

DetailsListItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

DetailsListItem.defaultProps = {
  label: '',
  value: '',
};

export default DetailsListItem;
