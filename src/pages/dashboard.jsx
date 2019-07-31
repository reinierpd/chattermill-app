/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import dynamic from 'next/dynamic';
import { Router } from 'routes';
import WithFilterData from 'components/common/WithFilterData';

const styles = {
  root: {
    padding: '15px 10px',
  },
  textCenter: {
    textAlign: 'center',
  },
};

/**
 * @description
 * Lazy load the chart component for only be displayed in client side
 * */
const DynamiChart = dynamic(() => import('components/BarChart'), {
  ssr: false,
  loading: () => 'Loading chart....',
});

class DashboardPage extends React.PureComponent {
  static async getInitialProps({ query }) {
    return {
      query,
    };
  }

  /**
   * @description
   * Generate the average sentiments for each theme.
   * @param {Array} categories - Array of reviews.
   * @param {Array} themes - Array of themes.
   * @param {Array} reviews - Array of reviews.
   * @param {boolean} breakByThemes - Boolean for break down by themes.
   * @returns {Array} Formatted Array for chart.
   * */
  generateChartData = (categories, themes, reviews, breakByThemes) => {
    const processedThemesData = {};
    const processedCategoriesData = {};
    /* create an object of themes/categories counting the total of sentiment
    by each one.
     Object signature:
     {
     [theme_id/category_id]:{
        acc:[sum_of_sentiments],
        counter: [total_of_reviews]
        name: [theme_name/category_name]
        }
     }
     */
    if (breakByThemes) {
      reviews.forEach(review =>
        review.themes.forEach(theme => {
          const { theme_id } = theme;
          if (
            Object.prototype.hasOwnProperty.call(processedThemesData, theme_id)
          ) {
            processedThemesData[theme_id].acc += theme.sentiment;
            processedThemesData[theme_id].counter += 1;
          } else {
            const relatedTheme = themes.filter(
              item => item.id === theme.theme_id,
            )[0];
            if (relatedTheme) {
              processedThemesData[theme_id] = { acc: 0, counter: 0 };
              processedThemesData[theme.theme_id].name = relatedTheme.name;
            }
          }
        }),
      );
      return this.formatData(processedThemesData, 'theme');
    }
    // initialize the object with every category
    categories.forEach(category => {
      processedCategoriesData[category.id] = {
        acc: 0,
        counter: 0,
        name: category.name,
      };
    });
    // count the sentiments by category
    reviews.forEach(review =>
      review.themes.forEach(theme => {
        const { theme_id } = theme;
        const relatedTheme = themes.filter(item => item.id === theme_id)[0];
        if (relatedTheme) {
          processedCategoriesData[relatedTheme.category_id].acc +=
            theme.sentiment;
          processedCategoriesData[relatedTheme.category_id].counter += 1;
        }
      }),
    );

    return this.formatData(processedCategoriesData, 'categories');
  };

  formatData = (inputData, label) => {
    // return an array with the average of sentiments by theme
    const chartData = [[label, 'sentiment', { role: 'style' }]];
    Object.keys(inputData).forEach(key => {
      const sentiment =
        inputData[key].counter > 0
          ? inputData[key].acc / inputData[key].counter
          : 0;
      const color = sentiment > 0 ? '#556cd6' : 'red';
      chartData.push([inputData[key].name, sentiment, color]);
    });
    return chartData;
  };

  /**
   * @description
   * Change view trigger.
   * @param {Object} filters - Applied filters.
   * */
  handleShowReviews = filters => {
    Router.pushRoute('feed', filters);
  };

  render() {
    const { query, classes } = this.props;
    return (
      <Container maxWidth="xl">
        <h2>Dashboard</h2>
        <WithFilterData initialFilters={query} route="dashboard">
          {({ reviews, themes, categories, appliedFilters }) => {
            const breakByThemes =
              Object.prototype.hasOwnProperty.call(
                appliedFilters,
                'category_id',
              ) && appliedFilters.category_id !== null;
            const chartTitle = `Average sentiments by ${
              breakByThemes ? 'theme' : 'category'
            }.`;
            return (
              <Paper xs={12} className={classes.root}>
                <Button
                  color="primary"
                  onClick={() => this.handleShowReviews(appliedFilters)}
                >
                  See reviews
                </Button>
                <h3 className={classes.textCenter}>{chartTitle}</h3>
                <DynamiChart
                  data={this.generateChartData(
                    categories,
                    themes,
                    reviews,
                    breakByThemes,
                  )}
                />
              </Paper>
            );
          }}
        </WithFilterData>
      </Container>
    );
  }
}

DashboardPage.propTypes = {
  query: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};
export default withStyles(styles)(DashboardPage);
