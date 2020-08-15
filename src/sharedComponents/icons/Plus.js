import React from 'react';
import PropTypes from 'prop-types';

const Plus = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <polygon
      fill={color}
      points="834.5,456.1 567.9,456.1 567.9,189.5 456.1,189.5 456.1,456.1 189.5,456.1 189.5,567.9 456.1,567.9 
	456.1,834.5 567.9,834.5 567.9,567.9 834.5,567.9 "
    />
  </svg>
);

Plus.propTypes = {
  color: PropTypes.string,
};

export default Plus;
