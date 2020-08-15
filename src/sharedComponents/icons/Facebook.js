import React from 'react';
import PropTypes from 'prop-types';

const Facebook = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M648.86 336V219H543.67a109.31 109.31 0 00-109.31 109.32v75.94h-58.5v117h58.5V804h117V521.26h78l9.75-117h-87.75v-56.74A11.51 11.51 0 01562.87 336z"
    />
  </svg>
);

Facebook.propTypes = {
  color: PropTypes.string,
};

export default Facebook;
