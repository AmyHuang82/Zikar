import React from 'react';
import PropTypes from 'prop-types';

const Random = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <polygon
      fill={color}
      points="676.8,407.3 676.8,463.6 843.3,367.5 676.8,271.4 676.8,319.4 542.2,319.4 542.2,319.5 542.2,319.4 
	336,618.6 180.7,618.6 180.7,706.5 381.2,706.5 381.2,706.3 381.4,706.5 587.6,407.3 "
    />
    <polygon
      fill={color}
      points="399.8,494.9 453.6,418.9 381.6,317.3 381.4,317.4 381.4,317.3 180.9,317.3 180.9,405.1 336.2,405.1 "
    />
    <polygon
      fill={color}
      points="676.8,616.7 594.7,616.7 531.2,527.1 477.4,603.1 549.3,704.6 549.3,704.5 549.3,704.6 676.8,704.6 
	676.8,752.6 843.3,656.5 676.8,560.4 "
    />
  </svg>
);

Random.propTypes = {
  color: PropTypes.string,
};

export default Random;
