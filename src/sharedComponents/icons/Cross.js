import React from 'react';
import PropTypes from 'prop-types';

const Cross = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M556.16 512.26L733 335.39a31.49 31.49 0 000-44.54 31.49 31.49 0 00-44.55 0L511.61 467.71 334.74 290.85a31.49 31.49 0 00-44.55 0 31.49 31.49 0 000 44.54l176.87 176.87-176.87 176.87a31.51 31.51 0 000 44.55 31.51 31.51 0 0044.55 0l176.87-176.87 176.87 176.87a31.51 31.51 0 0044.55 0 31.51 31.51 0 000-44.55z"
    />
  </svg>
);

Cross.propTypes = {
  color: PropTypes.string,
};

export default Cross;
