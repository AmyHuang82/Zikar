import React from 'react';
import PropTypes from 'prop-types';

const Picture = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M754.6,214.8H269.4c-30.1,0.1-54.5,24.5-54.5,54.5v485.3c0.1,30.1,24.5,54.5,54.5,54.5h485.3
	c30.1-0.1,54.5-24.5,54.5-54.5V269.4C809.1,239.3,784.7,214.9,754.6,214.8z M531.9,733.9H267.6L399.8,505l71.5,123.8l112.2-194.4
	l172.9,299.4H531.9z"
    />
  </svg>
);

Picture.propTypes = {
  color: PropTypes.string,
};

export default Picture;
