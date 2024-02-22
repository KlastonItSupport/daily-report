import React, { forwardRef } from "react";
import {
  Container,
  ErrorLabel,
  Label,
  InputField,
  StyledInput,
  IconContainer,
} from "./style";

const Input = forwardRef(
  ({ label, placeholder, error, margin, icon, ...rest }, ref) => {
    return (
      <Container style={{ margin: margin }}>
        <Label>{label}</Label>
        <InputField>
          <IconContainer>{icon}</IconContainer>
          <StyledInput {...rest} placeholder={placeholder} ref={ref} />
        </InputField>
        {error && <ErrorLabel>{error}</ErrorLabel>}
      </Container>
    );
  }
);

export default Input;
