import React from "react";
import { TextareaFieldProps } from "@/lib/types";

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}) => (
  <div>
    <label htmlFor={id} className="block text-m font-semibold">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="border w-full p-2 rounded-lg mt-1 h-52"
      placeholder={placeholder}
    ></textarea>
  </div>
);

export default TextareaField;
