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

const SentimentChart = ({ data, labelField, valueField }) => (
  <Chart data={data}>
    <ArgumentAxis />
    <ValueAxis max={7} />
    <BarSeries valueField={valueField} argumentField={labelField} />
    <Title text="Theme Sentiments" />
    <Animation />
  </Chart>
);

SentimentChart.propTypes = {
  data: PropTypes.instanceOf([]).isRequired,
  labelField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
};
