import React from 'react';
import PropTypes from 'prop-types';

const Arrow = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M806.75 421.16l-44.54-44.54-247.6 247.59-247.6-247.59-44.54 44.54 247.59 247.6-.6.6 44.55 44.55.6-.6.6.6 44.54-44.55-.59-.6 247.59-247.6z"
    />
  </svg>
);

Arrow.propTypes = {
  color: PropTypes.string,
};

export default Arrow;
