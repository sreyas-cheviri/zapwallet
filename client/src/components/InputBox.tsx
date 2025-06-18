import React from 'react';

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputBox: React.FC<InputBoxProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1 bg-wh">
    {label && <label className="text-sm text-blue-800 px-2 font-medium">{label}</label>}
    <input
      {...props}
      className={`border bg-gray-100 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-200 ${props.className || ''}`}
    />
  </div>
);

export default InputBox;