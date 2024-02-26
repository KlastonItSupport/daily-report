import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
`;

const TextAreaField = styled.textarea`
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  resize: vertical;
  height: 100px;

  &:focus {
    border-color: #7d7a7a;
  }
`;

const Counter = styled.p`
  font-size: 12px;
  margin-top: 4px;
`;

const ErrorLabel = styled.p`
  font-size: 12px;
  margin-top: 4px;
  color: red;
`;

const TextArea = forwardRef(({ label, error, ...rest }, ref) => {
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCharCount(inputValue.length);
  };

  return (
    <TextAreaContainer>
      <Label>{label}</Label>
      <TextAreaField ref={ref} onChange={handleInputChange} {...rest} />
      <Counter>{`${charCount} caracteres`}</Counter>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </TextAreaContainer>
  );
});

TextArea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};

export default TextArea;
