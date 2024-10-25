import React from "react";
import { Input } from "@windmill/react-ui";

const InputArea = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type = "text", // Default to text type
  autoComplete,
  placeholder,
}) => {
  return (
    <Input
      {...register(name, { required: required ? `${label} is required!` : false })}
      defaultValue={defaultValue}
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete={autoComplete}
      className="h-12 p-2 mr-2"
    />
  );
};

export default InputArea;
