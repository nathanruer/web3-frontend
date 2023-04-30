'use client';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick,
}) => {
  return ( 
    <button
      className="relative rounded-lg text-black bg-white
      p-2 hover:opacity-80 transition hover:scale-110"
      onClick={onClick}
    >
      {label}
    </button>
   );
}
 
export default Button;