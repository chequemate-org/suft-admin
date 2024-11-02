import React from "react";
import { Select } from "@windmill/react-ui";

const SelectRole = ({ name, label, value, onChange }) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={name} className="mb-1">{label}</label>}
      <Select
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="" defaultValue hidden>
          {label || "Select Role"}
        </option>
        <option value="Admin">Admin</option>
        <option value="CEO">CEO</option>
        <option value="Manager">Manager</option>
        <option value="Accountant">Accountant</option>
        <option value="Driver">Driver</option>
        <option value="Security Guard">Security Guard</option>
        <option value="Delivery Person">Delivery Person</option>
      </Select>
    </div>
  );
};

export default SelectRole;
