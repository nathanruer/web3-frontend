'use client';
import { ChangeEvent, useState } from 'react';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type, 
  value,
  onChange
}) => {

  return (
    <div className="w-full relative">
      <input
        id={id}
        placeholder={label}
        type={type}
        className="w-full p-2 mb-2 font-light 
        bg-white rounded-md"
        value={value}
        onChange={onChange}
      />
    </div>
   );
}
 
export default Input;
