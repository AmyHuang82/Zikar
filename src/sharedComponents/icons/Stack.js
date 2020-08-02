import React from 'react';
import PropTypes from 'prop-types';

const Stack = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <g>
      <rect
        fill={color}
        x={478.9}
        y={436.84}
        width={66}
        height={485}
        rx={33}
        ry={33}
        transform="rotate(90 511.9 679.34)"
      />
      <rect
        fill={color}
        x={478.9}
        y={269.84}
        width={66}
        height={485}
        rx={33}
        ry={33}
        transform="rotate(90 511.9 512.34)"
      />
      <rect
        fill={color}
        x={478.9}
        y={102.84}
        width={66}
        height={485}
        rx={33}
        ry={33}
        transform="rotate(90 511.9 345.34)"
      />
    </g>
  </svg>
);

Stack.propTypes = {
  color: PropTypes.string,
};

export default Stack;
