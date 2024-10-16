import React from "react";

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}) => (
  <div>
    <label htmlFor={id} className="block text-m font-semibold text-gray-700">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="border border-black w-full p-2 rounded-lg mt-1 h-52"
      placeholder={placeholder}
    ></textarea>
  </div>
);

export default TextareaField;
