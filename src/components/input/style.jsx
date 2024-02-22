// style.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

export const InputField = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #d5d5d5;
  border-radius: ${(props) => props.borderRadius || "8px"};
  margin: 8px 0;
  outline: none;
  padding: 14px 8px 14px 40px;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 300;

  &::focus {
    border-color: #7d7a7a;
    background-color: #f9f9f9;
  }

  @media screen and (min-width: 768px) {
    max-width: 268px;
  }

  &::placeholder {
    color: #747474;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const HintText = styled.div`
  font-size: 12px;
  margin-top: 4px;
  color: #777; /* Cor para dicas */
  position: absolute;
  left: 8px;
  top: calc(100% + 4px);
`;

export const ErrorLabel = styled.p`
  font-size: 12px;
  margin-bottom: 6px;
  color: red;
`;
