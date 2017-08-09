import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

import SvgIcon from 'common/icons/SvgIcon';

import SpinnerText from './SpinnerText';

/**
 * Build a simple spinner, based on the Google material design
 * @param  {Object} options.defaultStyles The default styles
 * @param  {string} options.fillColor     The fill color for the spinner
 * @param  {number} options.height        The height
 * @param  {Object} options.style         The passed in styles
 * @param  {Object} options.svgStyle      The styles for the SvgIcon
 * @param  {string} options.text          The text to display (if any) underneath the spinner
 * @param  {string} options.textColor     The color for the text which is displayed underneath the spinner
 * @param  {string} options.viewBox       The view-box for the SvgIcon
 * @param  {number} options.width         The width
 * @param  {Object} options               The props for the Spinner component
 * @return {JSX}
 */
const Spinner = ({
  defaultStyles,
  fillColor,
  height,
  style,
  svgStyle,
  text,
  textColor,
  viewBox,
  width,
}) => (
  <div
    style={{
      ...defaultStyles,
      ...style,
    }}
    className="spinner-container"
  >
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
    {
      !isEmpty(text) &&
      <SpinnerText text={text} color={textColor} />
    }
  </div>
);

Spinner.propTypes = {
  defaultStyles: PropTypes.object,
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
  defaultStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
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
