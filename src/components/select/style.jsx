import styled from "styled-components";

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
`;

export const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  outline: none;
  font-size: 16px;

  &:focus {
    border-color: #7d7a7a;
  }
`;
