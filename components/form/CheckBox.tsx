import React from "react";
import { CheckboxProps } from "@/lib/types";

const Checkbox: React.FC<CheckboxProps> = ({ name, id, onChange }) => {
  return <input type="checkbox" name={name} id={id} onChange={onChange} />;
};

export default Checkbox;
