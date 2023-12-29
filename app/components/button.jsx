import React from 'react';

const BlackButton = ({ children,onClick,className,disabled}) => {
  return (
    <button
      className={"bg-black text-white text-center py-2 px-2 rounded max-[849px]:text-xs " + className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BlackButton;
