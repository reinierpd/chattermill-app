import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import WithFilterData from 'components/common/WithFilterData';
import ReviewList from 'components/ReviewList';

class FeedPage extends React.Component {
  static async getInitialProps({ query }) {
    return {
      query,
    };
  }

  render() {
    const { query } = this.props;
    return (
      <Container maxWidth="xl">
        <h2>Reviews</h2>
        <WithFilterData initialFilters={query} route="feed">
          {({ reviews, themes, handleFetchMore }) => (
            <ReviewList
              reviews={reviews}
              themes={themes}
              handleFetchMore={handleFetchMore}
            />
          )}
        </WithFilterData>
      </Container>
    );
  }
}
FeedPage.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired,
};
export default FeedPage;
