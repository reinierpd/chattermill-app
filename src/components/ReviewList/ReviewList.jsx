/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

/**
 * @description
 * Component for create the reviews list
 * @param {Object} - - React props.
 * */
const ReviewList = ({ reviews, themes, handleFetchMore }) => {
  const classes = useStyles();
  const themesObj = themes.reduce((acc, theme) => {
    if (!Object.hasOwnProperty.call(acc, theme.id)) {
      acc[theme.id] = theme.name;
    }
    return acc;
  }, {});

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
                  disableTypography
                  primary={
                    <div>
                      <Rate score={item.score} />
                      <Moment
                        className={classes.date}
                        date={item.created_at}
                        format="dddd, MMMM D, YYYY"
                      />
                    </div>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="div"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {item.comment}
                      </Typography>
                      <List>
                        {item.themes
                          .filter(
                            theme =>
                              themesObj[theme.theme_id] !== undefined &&
                              theme.sentiment !== 0,
                          )
                          .map(theme => (
                            <ListItem
                              key={theme.id}
                              button
                              className={classes.nested}
                            >
                              <ListItemIcon>
                                <React.Fragment>
                                  {theme.sentiment === 1 && (
                                    <SatisfiedIcon color="secondary" />
                                  )}
                                  {theme.sentiment === -1 && (
                                    <DissatisfiedIcon color="error" />
                                  )}
                                </React.Fragment>
                              </ListItemIcon>
                              <ListItemText
                                primary={themesObj[theme.theme_id]}
                              />
                            </ListItem>
                          ))}
                      </List>
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
 * @param themes - Array of themes.
 * @param handleFetchMore - callback function for fetch more elements.
 * */
ReviewList.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  themes: PropTypes.instanceOf(Array).isRequired,
  handleFetchMore: PropTypes.func.isRequired,
};

export default ReviewList;
