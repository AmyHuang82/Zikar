import React from 'react';
import PropTypes from 'prop-types';

const Korean = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M512 164.5c-191.9 0-347.5 155.6-347.5 347.5S320.1 859.5 512 859.5 859.5 703.9 859.5 512 703.9 164.5 512 164.5zm0 648.7c-166.3 0-301.2-134.9-301.2-301.2S345.7 210.8 512 210.8 813.2 345.7 813.2 512 678.3 813.2 512 813.2z"
    />
    <path
      fill={color}
      d="M357.8 452.5v-45.9h195.4v45.9H357.8zm98.5 130.2c-49.2 0-82-28-82-62.3 0-33.2 32.4-61.9 82-61.9 48.8 0 82 28.7 82 61.9 0 34.7-33.2 62.3-82 62.3zm-60.4 96.2v-87.6h59.3v41.4h175.6v46.2H395.9zM407 395.5v-44.7h99.6v44.7H407zm49.6 145.4c15.7 0 28.3-7.8 28.3-20.5s-12.7-20.9-28.3-20.9-28.3 8.2-28.3 20.9 12.7 20.5 28.3 20.5zm168.2-39.2v95.1h-57.4V345.1h57.4v108.5h41.4v48.1h-41.4z"
    />
  </svg>
);

Korean.propTypes = {
  color: PropTypes.string,
};

export default Korean;
