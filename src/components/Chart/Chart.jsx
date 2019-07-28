import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

/**
 * @description
 * Component for create a bar chart.
 * @param {Object} - - React props.
 * */
const BarChart = ({ data, labelField, valueField, title }) => (
  <Chart data={data}>
    <ArgumentAxis />
    <ValueAxis max={7} />
    <BarSeries valueField={valueField} argumentField={labelField} />
    <Title text={title} />
    <Animation />
  </Chart>
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
  data: PropTypes.instanceOf([]).isRequired,
  title: PropTypes.string.isRequired,
  labelField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
};
