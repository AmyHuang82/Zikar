import React from 'react';
import PropTypes from 'prop-types';

const Star = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M530.3,228l79.8,161.8c3,6,8.7,10.2,15.4,11.2l178.5,25.9c11.2,1.6,18.9,12,17.3,23.1c-0.6,4.4-2.7,8.6-6,11.7
	L686.2,587.7c-4.8,4.7-7,11.4-5.9,18.1l30.5,177.8c1.9,11.1-5.6,21.6-16.8,23.5c-4.4,0.7-8.9,0-12.9-2.1l-159.7-84
	c-5.9-3.1-13.1-3.1-19,0l-159.7,84c-10,5.2-22.3,1.4-27.6-8.6c-2.1-4-2.8-8.5-2-12.9l30.5-177.8c1.1-6.6-1.1-13.4-5.9-18.1
	L208.6,461.7c-8.1-7.9-8.2-20.8-0.4-28.9c3.1-3.2,7.2-5.3,11.7-6l178.5-25.9c6.6-1,12.4-5.1,15.4-11.2L493.7,228
	c5-10.1,17.2-14.3,27.3-9.3C525.1,220.7,528.3,224,530.3,228z"
    />
  </svg>
);

Star.propTypes = {
  color: PropTypes.string,
};

export default Star;
