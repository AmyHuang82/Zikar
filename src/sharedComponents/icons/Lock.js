import React from 'react';
import PropTypes from 'prop-types';

const Lock = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="-400 0 1600 1000"
    {...props}
  >
    <path
      fill={color}
      d="M656.63 449.62V303.43c0-404.17-606.26-404.17-606.26 0v146.19A66.23 66.23 0 00-.25 513.77v444.5a66.18 66.18 0 0066 66h575.5a66.19 66.19 0 0066-66v-444.5a66.24 66.24 0 00-50.62-64.15zm-267 308.52V873.6a36.09 36.09 0 11-72.17 0V758.14a93.83 93.83 0 1172.17 0zM562.8 447.78H144.19V309.16c0-279.07 418.61-279.07 418.61 0z"
    />
  </svg>
);

Lock.propTypes = {
  color: PropTypes.string,
};

export default Lock;
