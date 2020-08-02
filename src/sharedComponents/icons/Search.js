import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ color = 'black', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill={color}
      d="M815.43,727.6l-210.54-148,2.69-3.35a219.68,219.68,0,0,0,31-112.92c0-121.89-98.81-220.71-220.71-220.71S197.2,341.48,197.2,463.37,296,684.09,417.91,684.09a219.93,219.93,0,0,0,148.34-57.3L777.62,775.4a30,30,0,0,0,42.08-4.91l.64-.82A29.94,29.94,0,0,0,815.43,727.6ZM417.91,623.14A159.77,159.77,0,1,1,577.67,463.37,159.76,159.76,0,0,1,417.91,623.14Z"
    />
  </svg>
);

Search.propTypes = {
  color: PropTypes.string,
};

export default Search;
