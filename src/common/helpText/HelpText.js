import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';

/**
 * Class to display a list of help texts to the user
 * @class
 * @extends {Component}
 */
class HelpText extends Component {
  /**
   * Render the list of texts to be displayed to the user
   * @return {JSX}
   */
  renderTextList() {
    const { style, text, } = this.props;

    if (!isEmpty(text)) {
      return text.map(text => (
        <p key={shortid.generate()} style={style.singleLine}>{text}</p>
      ));
    }

    return null;
  }

  render() {
    return (
      <div style={this.props.style}>
        <div style={this.props.style.inner}>
          {this.renderTextList()}
        </div>
      </div>
    );
  }
}

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
