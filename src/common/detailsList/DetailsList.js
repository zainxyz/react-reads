import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';

import DetailsListItem from './DetailsListItem';
import { textReplacement } from 'utils/stringUtils';

class DetailsList extends Component {
  renderListItems(definitions, item) {
    return definitions.map(definition => (
      <DetailsListItem
        key={shortid.generate()}
        label={definition.label}
        value={textReplacement(definition.valueTemplate, item)}
      />
    ));
  }

  renderList() {
    const { data, definitions, } = this.props;

    if (!isEmpty(data)) {
      return (
        <ul>
          {this.renderListItems(definitions, data)}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="details-list">
        {this.renderList()}
      </div>
    );
  }
}

DetailsList.propTypes = {
  data: PropTypes.object.isRequired,
  definitions: PropTypes.array.isRequired,
};

export default DetailsList;
