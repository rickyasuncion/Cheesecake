import React from "react";

const Button = ({ children, variant = "primary", className = "", onClick }) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
