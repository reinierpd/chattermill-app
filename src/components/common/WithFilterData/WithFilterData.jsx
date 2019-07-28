import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Api from 'api';
import Filter from 'components/Filter';

/**
 * @description
 * Component for handle filters. This component encapsulates all filtering and
 * api call logic exposing the updated data through the render prop pattern.
 * The exposed data is an object with the following fields:
 * reviews {Array}: List of reviews.
 * categories {Array}: List of categories
 * themes {Array}: List of themes
 * handleFetchMore {Function}: Fetch more trigger
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
    if (Object.prototype.hasOwnProperty.call(data, 'category_id')) {
      newState.appliedFilters.theme_id = null;
      newState.themes = await Api.getThemes(data);
    }
    newState.reviews = await Api.getReviews(newState.appliedFilters);
    this.setState(newState, () => {
      Router.pushRoute(route, { ...newState.appliedFilters });
    });
  };

  /**
   * @description
   * Trigger function for fetch more reviews and update the state data
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

  render() {
    const { children } = this.props;
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
          })}
        </Grid>
        <Grid item sm={4}>
          <Paper>
            <Filter
              key="category"
              name="category_id"
              data={categories}
              label="Category"
              value={appliedFilters.category_id}
              handleChange={this.handleFilter}
            />
            <Filter
              key="theme"
              name="theme_id"
              data={themes}
              label="Theme"
              value={appliedFilters.theme_id}
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
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

/**
 * WithFilterData PropTypes
 * @param initialFilters - Initial filters data
 * @param route - Route to push filters
 * @param children- React children prop
 */
WithFilterData.propTypes = {
  initialFilters: PropTypes.shape({}).isRequired,
  route: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};
export default WithFilterData;
