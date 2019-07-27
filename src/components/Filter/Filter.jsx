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

Filter.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default Filter;
