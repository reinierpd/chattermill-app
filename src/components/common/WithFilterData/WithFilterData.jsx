import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Router } from 'routes';
import Api from 'api';
import Filter from 'components/Filter';

const filterStyles = {
  root: {
    position: 'fixed',
    right: '0',
    padding: '10px 20px',
  },
};

/**
 * @description
 * Component for handle filters. This component encapsulates all filtering and
 * api call logic exposing the updated data through the render prop pattern.
 * The exposed data is an object with the following fields:
 * reviews {Array}: List of reviews.
 * categories {Array}: List of categories
 * themes {Array}: List of themes
 * handleFetchMore {Function}: Fetch more trigger
 * appliedFilters {Object}: Applied filters.
 * */
class WithFilterData extends React.Component {
  constructor(props) {
    super(props);
    const { initialFilters } = this.props;
    this.state = {
      offset: 0,
      reviews: [],
      categories: [],
      themes: [],
      appliedFilters: {
        ...initialFilters,
      },
      properties: {},
    };
  }

  async componentDidMount() {
    const { offset, appliedFilters } = this.state;
    const categories = await Api.getCategories();
    const themes = await Api.getThemes({
      category_id: appliedFilters.category_id || null,
    });
    const reviews = await Api.getReviews({ offset, ...appliedFilters });
    const properties = this.processProperties(reviews);
    this.setState({
      categories,
      themes,
      reviews,
      properties,
    });
  }

  /**
   * @description
   * This method extract the properties from reviews return an object with all
   * values available for each property.
   * @param {Array} reviews  - Array of reviews.
   * @returns {Object} Object with values by property.
   * */
  processProperties = reviews => {
    const output = {};
    reviews.forEach(review =>
      review.properties.forEach(prop => {
        if (prop.value) {
          if (Object.prototype.hasOwnProperty.call(output, prop.key)) {
            if (output[prop.key].options.indexOf(prop.value) < 0) {
              output[prop.key].options.push(prop.value);
            }
          } else {
            output[prop.key] = { options: [], name: prop.name };
          }
        }
      }),
    );
    return output;
  };

  /**
   * @description
   * Callback function called when a filter is added. It perform the api calls
   * and updates the state with the new data. After the state is updated the
   * new filters are pushed in the route.
   * @param {Object} data - Filter changed.
   * */
  handleFilter = async data => {
    const { appliedFilters } = this.state;
    const { route } = this.props;
    const filter = {};
    filter[data.name] = data.value ? data.value : null;
    const newState = {
      appliedFilters: {
        ...appliedFilters,
        ...filter,
        offset: 0,
      },
    };

    if (data.name === 'category_id') {
      newState.appliedFilters.theme_id = null;
      const params = data.value ? { category_id: data.value } : {};
      newState.themes = await Api.getThemes(params);
    }
    newState.reviews = await Api.getReviews(newState.appliedFilters);
    this.setState(newState, () => {
      Router.pushRoute(route, { ...newState.appliedFilters });
    });
  };

  /**
   * @description
   * Trigger function for fetch more reviews and update the state data.
   * */
  handleFetchMore = async () => {
    const { offset, reviews } = this.state;
    const newOffset = offset + 1;
    const newReviews = await Api.getReviews({ offset: newOffset });
    this.setState({
      reviews: [...reviews, ...newReviews],
      offset: newOffset,
    });
  };

  /**
   * @description
   * Callback function for reset filters.
   * * */
  resetFilters = () => {
    const { route } = this.props;
    this.setState({ appliedFilters: {} }, () => {
      Router.pushRoute(route, {});
    });
  };

  render() {
    const { classes, children } = this.props;
    const {
      reviews,
      categories,
      themes,
      appliedFilters,
      properties,
    } = this.state;
    return (
      <Grid container spacing={1}>
        <Grid item sm={8}>
          {children({
            reviews,
            categories,
            themes,
            handleFetchMore: this.handleFetchMore,
            appliedFilters,
          })}
        </Grid>
        <Grid>
          <Paper className={classes.root}>
            <h2>Filter by:</h2>
            <div>
              <Filter
                key="category"
                name="category_id"
                data={categories}
                label="Category"
                value={appliedFilters.category_id || ''}
                handleChange={this.handleFilter}
              />
              <Filter
                key="theme"
                name="theme_id"
                data={themes}
                label="Theme"
                value={appliedFilters.theme_id || ''}
                handleChange={this.handleFilter}
              />
              {Object.keys(properties).map(key => (
                <Filter
                  key={key}
                  name={key}
                  data={properties[key].options}
                  label={properties[key].name}
                  value={appliedFilters[key] || ''}
                  handleChange={this.handleFilter}
                />
              ))}
            </div>
            <Button onClick={this.resetFilters} color="primary">
              Reset Filters
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

/**
 * WithFilterData PropTypes
 * @param initialFilters - Initial filters data
 * @param children- React children prop
 * @param handleFiltersUpdated - callback function.
 */
WithFilterData.propTypes = {
  initialFilters: PropTypes.shape({}).isRequired,
  route: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};
export default withStyles(filterStyles)(WithFilterData);
