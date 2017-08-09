import PropTypes from 'prop-types';
import React from 'react';

/**
 * Build the styles for the SvgIcon component
 * @param  {Object} style     The main styles
 * @param  {string} fillColor The fill color
 * @param  {number} width     The width
 * @param  {number} height    The height
 * @return {Object}
 */
const buildSvgStyles = (style, fillColor, width, height) => ({
  display: 'inline-block',
  color: '#fff',
  fill: fillColor,
  width,
  height,
  ...style,
});

/**
 * A component to build SVG icons given a set of customization properties.
 * @param  {Node}   options.children  The children for the SVG Icon
 * @param  {string} options.fillColor The fill color
 * @param  {number} options.height    The height of the SVG Icon
 * @param  {Object} options.style     The style for the SVG Icon
 * @param  {string} options.viewBox   The view-box of the SVG Icon
 * @param  {number} options.width     The width of the SVG Icon
 * @param  {Object} options           The props for the SvgIcon component
 * @return {JSX}
 */
const SvgIcon = ({
  children,
  fillColor,
  height,
  style,
  viewBox,
  width,
}) => (
  <svg
    style={buildSvgStyles(style, fillColor, width,height)}
    viewBox={viewBox}
  >
    {children}
  </svg>
);

SvgIcon.propTypes = {
  children: PropTypes.node,
  fillColor: PropTypes.string,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
  viewBox: PropTypes.string,
  width: PropTypes.number.isRequired,
};

SvgIcon.defaultProps = {
  children: () => {},
  fillColor: '',
  height: 16,
  style: {},
  viewBox: '0 0 24 24',
  width: 16,
};

export default SvgIcon;
