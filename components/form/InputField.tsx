import React from "react";
import { InputFieldProps } from "@/lib/types";

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}) => (
  <div>
    <label htmlFor={id} className="block text-m font-semibold text-gray-700">
      {label}
    </label>
    <input
      type={type}
      onChange={onChange}
      id={id}
      name={id}
      value={value}
      className="border border-black w-full p-2 rounded-lg mt-1"
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
