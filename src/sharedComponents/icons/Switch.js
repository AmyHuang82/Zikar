import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <polygon
      fill={color}
      points="671.7,460.8 832.5,368 671.7,275.2 671.7,321.6 191.7,321.6 191.5,406.4 671.7,406.4 "
    />
    <polygon
      fill={color}
      points="352.3,609.6 352.3,563.2 191.5,656 352.3,748.8 352.3,694.4 832.5,694.4 832.3,609.6 "
    />
  </svg>
);

Switch.propTypes = {
  color: PropTypes.string,
};

export default Switch;
