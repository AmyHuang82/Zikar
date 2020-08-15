import React from 'react';
import PropTypes from 'prop-types';

const Add = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <g>
      <path
        fill={color}
        d="M222.2 341.61h633.95v-46.56H172.06v436.96h50.14v-390.4z"
      />
      <path
        fill={color}
        d="M139.83 266.4h633.95v-46.56H89.68V656.8h50.15V266.4z"
      />
      <path
        fill={color}
        d="M250.86 367.88v437H935v-437zm448.9 250.56h-75.37v75.37h-63v-75.37h-75.34v-63h75.37V480.1h63v75.37h75.37z"
      />
    </g>
  </svg>
);

Add.propTypes = {
  color: PropTypes.string,
};

export default Add;
