import React from 'react';
import PropTypes from 'prop-types';
import Star from '@material-ui/icons/Star';

/**
 * @description
 * Component for display an score.
 * @param {Object} - - React props.
 * */
const Rate = ({ score }) => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <React.Fragment>
      {arr.map(item => (
        <Star htmlColor={item <= score ? 'gold' : 'gainsboro'} key={item} />
      ))}
    </React.Fragment>
  );
};

/**
 * @description
 * Rate propTypes.
 * @param {Number} score - Score number.
 * */
Rate.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Rate;
