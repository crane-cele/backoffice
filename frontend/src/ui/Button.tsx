import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  type?: 'button' | 'submit';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, type = 'button', className }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;