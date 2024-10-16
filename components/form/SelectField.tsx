import React from "react";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  value,
  onChange,
}) => (
  <div>
    <label htmlFor={id} className="block text-m font-semibold text-gray-700">
      {label}
    </label>
    <select
      id={id}
      value={value}
      name={id}
      className="border border-black w-full p-2 rounded-lg mt-1"
      onChange={onChange}
    >
      <option value="">Select a {label.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;