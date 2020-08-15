import React from 'react';
import PropTypes from 'prop-types';

const Sound = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M557.7,247.9L386.2,362H252.1c-20.7,0-37.4,16.7-37.4,37.4V624c0,20.6,16.7,37.4,37.4,37.4c0,0,0,0,0,0H385
	l172.7,114.7c23.3,13.5,52.5-3.4,52.5-30.3V278.2C610.2,251.3,581,234.4,557.7,247.9z"
    />
    <path
      fill={color}
      d="M656.6,357.8L639,372c94,77.7,95,201.4,3,280l17.6,14.2C760.8,579.6,759.8,443.5,656.6,357.8z"
    />
    <path
      fill={color}
      d="M731.1,321.1l-17.6,17.6c94,96.2,95,249.3,3,346.7l17.6,17.6C835.3,595.6,834.3,427.2,731.1,321.1z"
    />
  </svg>
);

Sound.propTypes = {
  color: PropTypes.string,
};

export default Sound;
