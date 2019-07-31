import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';

/**
 * @description
 * Component for create a bar chart.
 * @param {Object} - - React props.
 * */
const BarChart = ({ data }) => <Chart chartType="ColumnChart" data={data} />;

/**
 * @description
 * BarChart propTypes.
 * @param data - Array of data.
 * @param labelField - Label for bars
 * @param valueField - value for bars
 * */
BarChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};

export default BarChart;
