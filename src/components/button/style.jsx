import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 16px 22px;
  background-color: ${({ color }) => color || "#17033a"};
  color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin: ${({ margin }) => margin || "0px"};

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
