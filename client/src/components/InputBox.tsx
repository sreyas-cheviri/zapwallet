import React from 'react';

interface InputBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant : "search" | "default";
  label?: string;
  inputSize: "sm" | "md" | "lg" | "vsm";
}

const variantStyles ={
  search : "bg-zinc-100 rounded-full p-5 focus:outline-none border-2 border-dashed border-zinc-300",
  normal : "border bg-gray-100 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-200 "
}

const sizeStyles = {
  vsm: "px-2 py-.5 text-[.7rem]",
  sm: "px-4 py-1 text-[.9rem]",
  md: "px-3 py-2 text-sm md:text-md",
  lg: "px-5 py-3 text-md",
};
const defaultStyles =
  "font-sans    cursor-pointer";

const InputBox: React.FC<InputBoxProps> = ({ label, variant = "default", inputSize = "md", ...props }) => (
  <div className="flex flex-col gap-1 ">
    {label && <label className="text-sm text-blue-800 px-2 font-medium">{label}</label>}
    <input
      {...props}
      className={`
        ${defaultStyles}
        ${variantStyles[variant === "default" ? "normal" : variant]}
        ${sizeStyles[inputSize]}
        ${props.className || ''}
      `}
    />
  </div>
);

export default InputBox;