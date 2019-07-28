import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
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

  generateAggregatedData = (reviews, themes) => {
    const processedData = {};
    reviews.forEach(review =>
      review.themes.forEach(theme => {
        const { theme_id } = theme;
        if (Object.prototype.hasOwnProperty.call(processedData, theme_id)) {
          processedData[theme_id].acc += theme.sentiment;
          processedData[theme_id].counter += 1;
        } else {
          processedData[theme_id] = { acc: 0, counter: 0 };
          const relatedTheme = themes.filter(
            item => item.id === theme.theme_id,
          )[0];
          processedData[theme.theme_id].name = relatedTheme
            ? relatedTheme.name
            : 'MissingName';
        }
      }),
    );
    return Object.keys(processedData).map(key => ({
      theme: processedData[key].name,
      sentiment:
        processedData[key].counter > 0
          ? processedData[key].acc / processedData[key].counter
          : 0,
    }));
  };

  render() {
    const { query } = this.props;
    return (
      <Container maxWidth="xl">
        <h2>Dashboard</h2>
        <WithFilterData initialFilters={query} route="dashboard">
          {({ reviews, themes }) => (
            <Paper>
              <DynamiChart
                data={this.generateAggregatedData(reviews, themes)}
                labelField="theme"
                valueField="sentiment"
              />
            </Paper>
          )}
        </WithFilterData>
      </Container>
    );
  }
}
DashboardPage.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired,
};
export default DashboardPage;
