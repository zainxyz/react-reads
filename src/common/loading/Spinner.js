import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

import SvgIcon from '../icons/SvgIcon';
import SpinnerText from './SpinnerText';

const Spinner = (props) => {
  const {
    fillColor,
    height,
    style,
    svgStyle,
    text,
    textColor,
    viewBox,
    width,
  } = props;

  let spinnerText = null;

  if (!isEmpty(text)) {
    spinnerText = <SpinnerText text={text} color={textColor} />;
  }

  // Merge some default styles along with the passed in styles
  const mergedStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...style,
  };

  return (
    <div style={mergedStyles} className="spinner-container">
      <SvgIcon
        style={svgStyle}
        width={width}
        height={height}
        viewBox={viewBox}
      >
        <path
          fill={fillColor}
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </SvgIcon>
      {spinnerText}
    </div>
  );
};

Spinner.propTypes = {
  fillColor: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.object,
  svgStyle: PropTypes.object,
  text: PropTypes.string,
  textColor: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

Spinner.defaultProps = {
  fillColor: '#10aded', // LOADED
  height: 50,
  style: {},
  svgStyle: {},
  text: 'Loading...',
  textColor: '#10aded', // LOADED
  viewBox: '0 0 50 50',
  width: 50,
};

export default Spinner;
