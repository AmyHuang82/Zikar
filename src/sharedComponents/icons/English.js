import React from 'react';
import PropTypes from 'prop-types';

const English = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M512 164.7c-191.9 0-347.5 155.6-347.5 347.5S320.1 859.8 512 859.8s347.5-155.6 347.5-347.5S703.9 164.7 512 164.7zm0 648.7c-166.3 0-301.2-134.9-301.2-301.2S345.7 211 512 211s301.2 134.9 301.2 301.2S678.3 813.4 512 813.4z"
    />
    <path
      fill={color}
      d="M469.9 596.5V641H312V383.4h154.9V428h-95.5v61.1h85.9V532h-85.9v64.4h98.5zM712 383.4V641h-85.9l-54.8-153.6c-6.3-17.2-10.9-35-14.9-52.8h-3c4.3 42.3 6.3 101.7 6.3 137.7V641h-53.5V383.4h85.9L646.9 537c6.3 17.2 11.2 35 15.2 52.8h3c-4.3-42.6-6.6-87.9-6.6-130.8v-75.6H712z"
    />
  </svg>
);

English.propTypes = {
  color: PropTypes.string,
};

export default English;
