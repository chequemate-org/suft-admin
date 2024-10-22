import { Input } from "@windmill/react-ui";

const InputValue = ({
  name,
  label,
  type = "text",
  disabled = false,
  register = () => ({}), // Provide a default no-op function if register is not passed
  required,
  maxValue,
  minValue,
  currency,
  product,
  defaultValue = "",
  placeholder = "",
}) => {
  // Validation rules
  const value = {
    valueAsNumber: type === "number", // Only apply if the type is number
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
      value: /^[0-9]*$/, // Pattern validation for numeric values
      message: `Invalid ${label}!`,
    },
  };

  return (
    <div className="flex flex-row">
      {product && (
        <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-emerald-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
          {currency}
        </span>
      )}
      <Input
        {...register(name, value)} // Register is applied here
        type={type}
        name={name}
        step={type === "number" ? "0.01" : undefined} // Add step for numbers
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`mr-2 p-2 ${product && "rounded-l-none"}`} // Apply conditional styling if "product" prop is passed
      />
    </div>
  );
};

export default InputValue;
