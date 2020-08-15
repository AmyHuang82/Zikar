import React from 'react';
import PropTypes from 'prop-types';

const User = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M312.5 807.1h399c21.8 0 38.9-18.8 36.7-40.4-11-106.2-64.5-195.2-137.7-238-.1-.1-.1-.2 0-.3 73.5-51.8 93.7-150.9 48.5-226.9-54.2-91-169.5-112.4-252.7-46.8-70.8 55.7-86.4 157.7-34 232.3a169.6 169.6 0 0041.4 41.4c.1.1.1.2 0 .3-73.3 42.8-126.7 131.8-137.8 238-2.3 21.6 14.8 40.4 36.6 40.4z"
    />
  </svg>
);

User.propTypes = {
  color: PropTypes.string,
};

export default User;
