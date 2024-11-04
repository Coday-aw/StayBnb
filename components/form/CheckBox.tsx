import React from "react";
import { CheckboxProps } from "@/lib/types";

const Checkbox: React.FC<CheckboxProps> = ({ id, onChange }) => {
  return <input type="checkbox" id={id} onChange={onChange} />;
};

export default Checkbox;
