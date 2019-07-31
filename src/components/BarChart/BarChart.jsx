import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-google-charts';

/**
 * @description
 * Component for create a bar chart.
 * @param {Object} - - React props.
 * */
const BarChart = ({ data, title }) => (
  <Chart
    chartType="ColumnChart"
    data={data}
    options={{
      // Material design options
      chart: {
        title: { title },
        bars: 'vertical',
      },
    }}
  />
);

/**
 * @description
 * BarChart propTypes.
 * @param data - Array of data.
 * @param title - Chart title.
 * @param labelField - Label for bars
 * @param valueField - value for bars
 * */
BarChart.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired,
};

export default BarChart;
