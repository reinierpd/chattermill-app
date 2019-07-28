import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Api from 'api';
import Filter from 'components/Filter';

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

  processProperties = reviews => {
    const output = {};
    reviews.forEach(review =>
      review.properties.forEach(prop => {
        if (Object.prototype.hasOwnProperty.call(output, prop.key)) {
          if (output[prop.key].options.indexOf(prop.value) < 0) {
            output[prop.key].options.push(prop.value);
          }
        } else {
          output[prop.key] = { options: [], name: prop.name };
        }
      }),
    );
    return output;
  };

  handleFilter = async data => {
    const { appliedFilters } = this.state;
    const { route } = this.props;
    console.log('Filtering:', data);
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

WithFilterData.propTypes = {
  initialFilters: PropTypes.shape({}).isRequired,
  route: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};
export default WithFilterData;
