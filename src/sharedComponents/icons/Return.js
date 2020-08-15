import React from 'react';
import PropTypes from 'prop-types';

const Return = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M586,341.6l46.4-70.2l-391.6-23.6l175.3,350.9l64.4-97.5c72.6,111.4,73,253.8-6.8,353.8
	c56.7-12.8,108.9-42.1,149-87.7C727.6,647.7,710.3,460,586,341.6z"
    />
  </svg>
);

Return.propTypes = {
  color: PropTypes.string,
};

export default Return;
