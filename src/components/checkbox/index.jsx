import { CheckboxInput, CheckboxText, CheckboxWrapper } from "./style";

const Checkbox = ({ label, checked, onChange, margin }) => {
  return (
    <CheckboxWrapper margin={margin}>
      <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxText>{label}</CheckboxText>
    </CheckboxWrapper>
  );
};

export default Checkbox;
