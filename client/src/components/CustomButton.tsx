import React from 'react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className={`bg-blue-800 hover:bg-blue-900 hover:shadow-xl text-md md:text-lg text-zinc-100 font-medium py-2 px-8 rounded-xl transition duration-200 shadow ${props.className || ''}`}
  >
    {children}
  </button>
);

export default CustomButton;