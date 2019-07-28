/* eslint-disable camelcase */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import WithFilterData from 'components/common/WithFilterData';

/**
 * @description
 * Lazy load the chart component for only be displayed in client side
 * */
const DynamiChart = dynamic(() => import('components/Chart'), {
  ssr: false,
  loading: () => 'Loading chart....',
});

class DashboardPage extends React.Component {
  static async getInitialProps({ query }) {
    return {
      query,
    };
  }

  /**
   * @description
   * Generate the average sentiments for each theme.
   * @param {Array} reviews - Array of reviews.
   * @param {Array} themes - Array of themes.
   * @returns {Array} Array of themes with average of sentiments.
   * */
  generateAggregatedData = (reviews, themes) => {
    const processedData = {};
    /* create an object of themes counting the total of sentiment by each one.
     signature:
     {
     [theme_id]:{
        acc:[sum_of_sentiments],
        counter: [total_of_reviews]
        name: [theme_name]
        }
     }
     */
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
    // return an array with the average of sentiments by theme
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
                title="Theme Sentiments"
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
