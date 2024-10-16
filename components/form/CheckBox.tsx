import React from "react";

interface CheckboxProps {
  name: string;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, id, onChange }) => {
  return <input type="checkbox" name={name} id={id} onChange={onChange} />;
};

export default Checkbox;
