'use client';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean,
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  isLoading
}) => {
  return (
    <button className='w-1/2 bg-white rounded-xl text-gray-900 p-2
    border border-white hover:bg-transparent hover:text-white transition
    hover:scale-105'
    onClick={onClick}>
      {label}
    </button>
  )
}

export default Button