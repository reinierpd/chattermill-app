import React from 'react';
import PropTypes from 'prop-types';
import Feed from 'components/Feed';

class FeedPage extends React.Component {
  static async getInitialProps({ query }) {
    return {
      query,
    };
  }

  render() {
    const { query } = this.props;
    return <Feed initialFilters={query} />;
  }
}
FeedPage.propTypes = {
  query: PropTypes.instanceOf({}).isRequired,
};
export default FeedPage;
