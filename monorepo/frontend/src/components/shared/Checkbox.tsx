import React from 'react';
import { CheckboxProps } from '../../types/component.types';


const Checkbox: React.FC<CheckboxProps> = ({ children, error = false, ...props }) => {
  
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className={`form-checkbox border-2 ${
          error ? "border-red-500 accent-red-500" : "border-gray-300 accent-blue-500"
        }`}
        {...props}
      />
      <span className={`ml-2 ${error ? "text-red-600" : ""}`}>{children}</span>
    </label>
  );
};

export default Checkbox;