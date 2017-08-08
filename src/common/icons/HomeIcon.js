import PropTypes from 'prop-types';
import React from 'react';

import SvgIcon from '../icons/SvgIcon';

const HomeIcon = (props) => {
  const {
    fillColor,
    height,
    style,
    svgStyle,
    viewBox,
    width,
  } = props;

  return (
    <div style={style} className="ico-home">
      <SvgIcon
        style={svgStyle}
        width={width}
        height={height}
        viewBox={viewBox}
      >
        <path
          fill={fillColor}
          d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        />
      </SvgIcon>
    </div>
  );
};

HomeIcon.propTypes = {
  fillColor: PropTypes.string,
  height: PropTypes.number,
  style: PropTypes.object,
  svgStyle: PropTypes.object,
  viewBox: PropTypes.string,
  width: PropTypes.number,
};

HomeIcon.defaultProps = {
  fillColor: '#10aded', // LOADED
  height: 24,
  style: {},
  svgStyle: {},
  viewBox: '0 0 24 24',
  width: 24,
};

export default HomeIcon;
