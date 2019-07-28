import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import WithFilterData from 'components/common/WithFilterData';

const DynamiChart = dynamic(() => import('components/Chart'), {
  ssr: false,
  loading: () => 'Loading chart....',
});
const data = [
  { theme: 'Security', sentiment: -1 },
  { theme: 'Information', sentiment: 1 },
  { theme: 'Delivery', sentiment: 0.88 },
  { theme: 'Quality', sentiment: 0.44 },
  { theme: 'Clients', sentiment: -0.31 },
  { theme: 'Owner', sentiment: 0.927 },
  { theme: 'Services', sentiment: 1 },
];

class DashboardPage extends React.Component {
  static async getInitialProps({ query }) {
    return {
      query,
    };
  }

  render() {
    const { query } = this.props;
    return (
      <WithFilterData initialFilters={query} route="dashboard">
        {({ reviews }) => (
          <Paper>
            <DynamiChart data={data} />
          </Paper>
        )}
      </WithFilterData>
    );
  }
}
DashboardPage.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired,
};
export default DashboardPage;
