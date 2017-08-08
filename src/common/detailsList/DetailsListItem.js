import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

const renderLabel = label => (!isEmpty(label) ?
  <p>{label}</p> : null
);

const DetailsListItem = ({ label, value, }) => (!isEmpty(value) ?
  (
    <li className="details-list__item">
      {renderLabel(label)}
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
