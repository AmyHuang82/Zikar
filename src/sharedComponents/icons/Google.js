import React from 'react';
import PropTypes from 'prop-types';

const Google = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M688.74 468.25h-173.6v111.24h165.67a182.41 182.41 0 11-36.3-192.71l91.69-76.4A300.75 300.75 0 00511.61 210c-166.51 0-301.5 135-301.5 301.5S345.1 813 511.61 813s301.5-135 301.5-301.5a304.72 304.72 0 00-3.21-44.05z"
    />
  </svg>
);

Google.propTypes = {
  color: PropTypes.string,
};

export default Google;
