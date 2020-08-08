import React from 'react';
import PropTypes from 'prop-types';

const Edit = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M584.7 290.2c16.7-27.6 7.8-63.6-19.8-80.3-27.7-16.7-63.6-7.8-80.3 19.8l-235 389.2 100.2 60.5 234.9-389.2zM240.5 634.1l-2.3 116.8 102.4-56.4zM179 804.5h666v18H179z"
    />
  </svg>
);

Edit.propTypes = {
  color: PropTypes.string,
};

export default Edit;
