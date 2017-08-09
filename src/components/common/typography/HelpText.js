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
const HelpText = ({ style, text, }) => (
  <div style={style}>
    <div style={style.inner}>
      {
        !isEmpty(text) &&
        text.map(text =>
          <p key={shortid.generate()} style={style.singleLine}>{text}</p>
        )
      }
    </div>
  </div>
);

HelpText.propTypes = {
  text: PropTypes.array.isRequired,
  style: PropTypes.object,
};

HelpText.defaultProps = {
  style: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '20px',
    justifyContent: 'center',
    inner: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
      width: '80%',
    },
    lineHeight: 1.2,
    singleLine: {
      margin: '20px 0',
    },
  },
};

export default HelpText;
