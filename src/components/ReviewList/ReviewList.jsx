/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    height: '500px',
    overflowY: 'auto',
  },
  inline: {
    display: 'inline',
  },
}));

const ReviewList = ({ reviews, handleFetchMore }) => {
  const classes = useStyles();
  return (
    <div id="reviews" className={classes.root}>
      <InfiniteScroll
        dataLength={reviews.length}
        next={handleFetchMore}
        hasMore
        loader={<h4>Loading...</h4>}
        scrollableTarget="reviews"
      >
        {reviews.length > 0
          ? reviews.map((item, idx) => (
              <React.Fragment key={`${item.id}-${idx}`}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={item.score}
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
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))
          : 'Nothing to show...'}
      </InfiniteScroll>
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  handleFetchMore: PropTypes.func.isRequired,
};

export default ReviewList;
