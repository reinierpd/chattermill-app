import React from 'react';
import PropTypes from 'prop-types';
import WithFilterData from 'components/common/WithFilterData';
import ReviewList from 'components/ReviewList';

// class Feed extends React.Component {
//   constructor(props) {
//     super(props);
//     const { initialFilters } = this.props;
//     this.state = {
//       offset: 0,
//       reviews: [],
//       categories: [],
//       themes: [],
//       appliedFilters: {
//         ...initialFilters,
//       },
//       properties: {},
//     };
//   }
//
//   async componentDidMount() {
//     const { offset, appliedFilters } = this.state;
//     const categories = await Api.getCategories();
//     const themes = await Api.getThemes({
//       category_id: appliedFilters.category_id || null,
//     });
//     const reviews = await Api.getReviews({ offset, ...appliedFilters });
//     const properties = this.processProperties(reviews);
//     this.setState({
//       categories,
//       themes,
//       reviews,
//       properties,
//     });
//   }
//
//   processProperties = reviews => {
//     const output = {};
//     reviews.forEach(review =>
//       review.properties.forEach(prop => {
//         if (Object.prototype.hasOwnProperty.call(output, prop.key)) {
//           if (output[prop.key].options.indexOf(prop.value) < 0) {
//             output[prop.key].options.push(prop.value);
//           }
//         } else {
//           output[prop.key] = { options: [], name: prop.name };
//         }
//       }),
//     );
//     return output;
//   };
//
//   handleFilter = async data => {
//     const { appliedFilters } = this.state;
//     console.log('Filtering:', data);
//     const filter = {};
//     filter[data.name] = data.value ? data.value : null;
//     const newState = {
//       appliedFilters: {
//         ...appliedFilters,
//         ...filter,
//         offset: 0,
//       },
//     };
//     if (Object.prototype.hasOwnProperty.call(data, 'category_id')) {
//       newState.appliedFilters.theme_id = null;
//       newState.themes = await Api.getThemes(data);
//     }
//     newState.reviews = await Api.getReviews(newState.appliedFilters);
//     this.setState(newState, () => {
//       Router.pushRoute('feed', { ...newState.appliedFilters });
//     });
//   };
//
//   handleFetchMore = async () => {
//     const { offset, reviews } = this.state;
//     const newOffset = offset + 1;
//     const newReviews = await Api.getReviews({ offset: newOffset });
//     this.setState({
//       reviews: [...reviews, ...newReviews],
//       offset: newOffset,
//     });
//   };
//
//   render() {
//     const {
//       reviews,
//       categories,
//       themes,
//       appliedFilters,
//       properties,
//     } = this.state;
//     return (
//       <Grid container>
//         <Grid item sm={8}>
//           <ReviewList
//             reviews={reviews}
//             handleFetchMore={this.handleFetchMore}
//           />
//         </Grid>
//         <Grid item sm={4}>
//           <Filter
//             key="category"
//             name="category_id"
//             data={categories}
//             label="Category"
//             value={appliedFilters.category_id}
//             handleChange={this.handleFilter}
//           />
//           <Filter
//             key="theme"
//             name="theme_id"
//             data={themes}
//             label="Theme"
//             value={appliedFilters.theme_id}
//             handleChange={this.handleFilter}
//           />
//           {Object.keys(properties).map(key => (
//             <Filter
//               key={key}
//               name={key}
//               data={properties[key].options}
//               label={properties[key].name}
//               value={appliedFilters[key] || ''}
//               handleChange={this.handleFilter}
//             />
//           ))}
//         </Grid>
//       </Grid>
//     );
//   }
// }

const Feed = ({ initialFilters }) => (
  <WithFilterData initialFilters={initialFilters}>
    {({ reviews, handleFetchMore }) => (
      <ReviewList reviews={reviews} handleFetchMore={handleFetchMore} />
    )}
  </WithFilterData>
);
Feed.propTypes = {
  initialFilters: PropTypes.shape({}).isRequired,
};
export default Feed;
