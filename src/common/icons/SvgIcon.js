import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Class to build SVG Icons given a set of customization properties.
 * @class
 * @extends {Component}
 */
class SvgIcon extends Component {
  /**
   * Get the styles for the SVG Icon
   * @return {Object}
   */
  getStyles() {
    const { fillColor, height, style, width, } = this.props;

    // Some default styles for the SVG Icon
    const defaultStyles = {
      display: 'inline-block',
      color: '#fff',
      fill: fillColor,
      height,
      width,
    };

    return {
      ...defaultStyles,
      ...style,
    };
  }

  render() {
    const { children, viewBox, } = this.props;

    return (
      <svg
        style={this.getStyles()}
        viewBox={viewBox}
      >
        {children}
      </svg>
    );
  }
}

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
