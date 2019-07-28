import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';

const SelectContainer = styled.div`
  padding: 5px 0;
  margin-bottom: 10px;
`;

/**
 * @description
 * Component for create a select input filter.
 * @param {Object} - - Passed Props.
 * @returns {*} - React component.
 * */
const Filter = ({ data, name, label, value, handleChange }) => (
  <SelectContainer>
    <FormControl>
      <InputLabel htmlFor={`${name}-select`}>{label}</InputLabel>
      <Select
        native
        value={value || ''}
        onChange={ev => handleChange({ name, value: ev.target.value })}
        inputProps={{
          name: 'name',
          id: `${name}-select`,
        }}
      >
        <option value="" />
        {data.map(item =>
          typeof item === 'object' ? (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ) : (
            <option key={item} value={item}>
              {item}
            </option>
          ),
        )}
      </Select>
    </FormControl>
  </SelectContainer>
);

/**
 * @description
 * Filter component propTypes.
 * @param data - select options data. This can be an array of object or an
 * array of values.
 * @param name - input name.
 * @param value - input value
 * @param label - input label
 * @param handleChange - callback Function
 * */
Filter.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default Filter;
