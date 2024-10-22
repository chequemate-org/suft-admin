import { Input } from "@windmill/react-ui";

const InputValueFive = ({
  name,
  label,
  type = "text", // Default type is text if not specified
  disabled = false,
  register = () => ({}), // Default to a no-op function if register is not passed
  required = false,
  maxValue,
  minValue,
  defaultValue = "",
  placeholder = "",
}) => {
  const value = {
    valueAsNumber: type === "number", // Only apply if the input type is number
    required: required ? `${label} is required!` : false,
    ...(maxValue && {
      max: {
        value: maxValue,
        message: `Maximum value ${maxValue}!`,
      },
    }),
    ...(minValue && {
      min: {
        value: minValue,
        message: `Minimum value ${minValue}!`,
      },
    }),
    pattern: {
      value: /^[0-9]*$/, // Pattern for numeric values
      message: `Invalid ${label}!`,
    },
  };

  return (
    <div className="flex flex-row">
      <Input
        {...register(name, value)} // Ensure register is properly used here
        name={name}
        type={type}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mr-2 p-2"
      />
    </div>
  );
};

export default InputValueFive;
