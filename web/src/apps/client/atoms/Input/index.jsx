import Text from "./Text";
import Radio from "./Radio";
import AvatarInput from "./AvatarInput/AvatarInput";

const Input = ({
  variant = "text",
  type,
  name,
  label,
  validations,
  onChange,
  onValidation,
  defaultValue,
  readOnly,
  entries,
}) => {
  switch (variant) {
    case "text":
      return (
        <Text
          {...{
            type,
            name,
            label,
            validations,
            onChange,
            onValidation,
            defaultValue,
            readOnly,
          }}
        />
      );
    case "radio":
      return (
        <Radio
          {...{
            label,
            name,
            entries,
            validations,
            onValidation,
            onChange,
            defaultValue,
            readOnly,
          }}
        />
      );
    case "avatar":
      return (
        <AvatarInput
          {...{
            onChange,
            defaultValue,
          }}
        />
      );
    default:
      throw new Error(`Invalid variant: ${variant} for Input component`);
  }
};

export default Input;
