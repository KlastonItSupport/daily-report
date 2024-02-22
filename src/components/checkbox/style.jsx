import styled from "styled-components";

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: ${(props) => props.margin || "0"};
`;

export const CheckboxInput = styled.input`
  margin-right: 8px;
`;

export const CheckboxText = styled.span`
  font-size: 16px;
`;
