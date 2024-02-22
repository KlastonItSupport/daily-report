import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Label, SelectContainer, SelectField } from "./style";

const SelectInput = forwardRef(({ label, options, ...rest }, ref) => {
  return (
    <SelectContainer>
      <Label>{label}</Label>
      <SelectField ref={ref} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>
    </SelectContainer>
  );
});

SelectInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SelectInput;
