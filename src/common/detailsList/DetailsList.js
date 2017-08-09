import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';

import { textReplacement } from 'utils/stringUtils';

import DetailsListItem from './DetailsListItem';

/**
 * Render a list of details based on a given data and definitions set
 * @param  {Object} options.data        The data for the definition
 * @param  {Array}  options.definitions The list of definitions (info about each list item)
 * @param  {Object} options             The props for the DetailsList component
 * @return {JSX}
 */
const DetailsList = ({ data, definitions, }) => (
  <div className="details-list">
    {
      !isEmpty(data) &&
      <ul>
        {
          definitions.map(definition => (
            <DetailsListItem
              key={shortid.generate()}
              label={definition.label}
              value={textReplacement(definition.valueTemplate, data)}
            />
          ))
        }
      </ul>
    }
  </div>
);

DetailsList.propTypes = {
  data: PropTypes.object.isRequired,
  definitions: PropTypes.array.isRequired,
};

export default DetailsList;
