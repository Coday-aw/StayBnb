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
    <label htmlFor={id} className="block text-m font-semibold ">
      {label}
    </label>
    <input
      type={type}
      onChange={onChange}
      id={id}
      name={id}
      value={value}
      className="border w-full p-2 rounded-lg mt-1"
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
