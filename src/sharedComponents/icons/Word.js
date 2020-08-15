import React from 'react';
import PropTypes from 'prop-types';

const Word = ({ color = 'black', showPlus = false, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M365.6,711.8L318.3,831h-95.6l206.9-546.2h80.7L711.9,831h-96.4l-44.7-119.2L365.6,711.8z M464.6,415.5
	l-77.2,225.3h158.7L464.6,415.5z"
    />
    {showPlus && (
      <path
        fill={color}
        d="M716.7,193v84h84.6v50.5h-84.6v84.6h-50.5v-84.5h-84V277h84v-84L716.7,193z"
      />
    )}
  </svg>
);

Word.propTypes = {
  color: PropTypes.string,
  showPlus: PropTypes.bool,
};

export default Word;
