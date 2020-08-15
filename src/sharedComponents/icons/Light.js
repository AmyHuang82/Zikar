import React from 'react';
import PropTypes from 'prop-types';

const Light = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <rect x="411.6" y="720" width="200.8" height="59" />
    <path
      fill={color}
      d="M452.2,857.1h119.6c22.4,0,40.6-29.2,40.6-65.1H411.6C411.6,828,429.8,857.1,452.2,857.1z"
    />
    <path
      fill={color}
      d="M512,166.9c-131.7,0-238.5,106.8-238.5,238.6c-0.1,55.1,19,108.4,53.9,151c31.8,48.5,84.2,91.5,84.2,148.4h201
	c0-56.9,52.4-100,84.2-148.4c34.9-42.6,54-95.9,53.9-151C750.5,273.7,643.7,166.9,512,166.9z M450,257.4
	c-60.4,24.2-94.7,74.8-94.9,139.8c0,7-5.8,12.7-12.8,12.6c-6.5,0-12-5-12.6-11.5c-7.6-80.6,34.3-142.3,112-165
	c5.2-1.5,10.7,0.4,13.9,4.8l0,0c4.1,5.7,2.9,13.6-2.8,17.8C451.9,256.5,451,257,450,257.4z"
    />
  </svg>
);

Light.propTypes = {
  color: PropTypes.string,
};

export default Light;
