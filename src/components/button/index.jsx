import { StyledButton } from "./style";

export const Button = ({ children, onClick, disabled, color, margin }) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      color={color}
      margin={margin}
    >
      {children}
    </StyledButton>
  );
};
