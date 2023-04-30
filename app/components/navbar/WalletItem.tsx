'use client';

interface WalletItemProps {
  label: string;
  disabled?: boolean;
}

const WalletItem: React.FC<WalletItemProps> = ({
  label,
  disabled,
}) => {
  return ( 
    <div className={`text-white px-6 py-4 rounded-xl border h-full
    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    ${disabled ? '' : 'hover:bg-neutral-700/20'}
    `}>
      {label}
      {disabled && <span className="text-gray-500 text-xs p-1">soon available</span>}
    </div>
   );
}
 
export default WalletItem;