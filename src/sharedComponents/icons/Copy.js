import React from 'react';
import PropTypes from 'prop-types';

const Copy = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path fill={color} d="M393.7 201.5v88.7H650v423.9h128.1V201.5z" />
    <path fill={color} d="M245.9 309.9h384.4v512.6H245.9z" />
  </svg>
);

Copy.propTypes = {
  color: PropTypes.string,
};

export default Copy;
