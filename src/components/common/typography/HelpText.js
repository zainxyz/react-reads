import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';

/**
 * Display a list of help texts
 * @param  {Object} options.style The styles for the help texts
 * @param  {Array}  options.text  The list of help texts to display
 * @param  {Object} options       The props for the HelpText component
 * @return {JSX}
 */
const HelpText = ({ text, }) => (
  <div className="help-text">
    <div className="help-text__list">
      {
        !isEmpty(text) &&
        text.map(text =>
          <p key={shortid.generate()} className="help-text__list__item">{text}</p>
        )
      }
    </div>
  </div>
);

HelpText.propTypes = {
  text: PropTypes.array.isRequired,
};

export default HelpText;
