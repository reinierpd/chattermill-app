/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';
import Rate from 'components/Rate';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    overflowY: 'auto',
  },
  inline: {
    display: 'inline',
  },
  date: {
    color: 'gray',
    fontSize: '12px',
  },
  list: {
    listStyle: 'none',
  },
}));

/**
 * @description
 * Component for create the reviews list
 * @param {Object} - - React props.
 * */
const ReviewList = ({ reviews, handleFetchMore }) => {
  const classes = useStyles();
  return (
    <InfiniteScroll
      className={classes.list}
      dataLength={reviews.length}
      next={handleFetchMore}
      hasMore
      loader={<h4>Loading...</h4>}
    >
      {reviews.length > 0
        ? reviews.map((item, idx) => (
            <React.Fragment key={`${item.id}-${idx}`}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Rate score={item.score} />
                      <Moment
                        className={classes.date}
                        date={item.created_at}
                        format="dddd, MMMM D, YYYY"
                      />
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {item.comment}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="middle" component="li" />
            </React.Fragment>
          ))
        : 'Nothing to show...'}
    </InfiniteScroll>
  );
};

/**
 * @description
 * ReviewList propTypes.
 * @param reviews - Array of reviews.
 * @param handleFetchMore - callback function for fetch more elements.
 * */
ReviewList.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  handleFetchMore: PropTypes.func.isRequired,
};

export default ReviewList;
