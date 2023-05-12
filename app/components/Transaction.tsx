'use client';

import Loader from "./Loader";

import { FaTimes } from 'react-icons/fa';

interface TransactionProps {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  label?: string;
  bgColor: string;
  textColor: string;
  onClose: () => void;
}

const Transaction: React.FC<TransactionProps> = ({
  isLoading,
  isSuccess,
  isError,
  label,
  bgColor,
  textColor,
  onClose
}) => {
  return (
    <div className={`flex absolute right-10 top-24 py-2 px-4 shadow-xl rounded-xl 
    gap-3 ${bgColor} ${textColor} max-w-[75%] lg:max-w-[25%] `}>
        {isLoading &&
          <div className="flex flex-row items-center gap-1">
            <Loader color="black"/>
            <p>Transaction loading...</p>
          </div>
        }
        {isSuccess &&
          <div className="flex flex-col">
            <p>Transaction successful !</p>
              {label && (
                <p>
                  <a
                    href={`https://goerli.etherscan.io/tx/${label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white/70 transition"
                  >
                    Etherscan
                  </a>
                </p>
              )}
          </div>
        }
        {isError &&
          <div className="items-center text-white">
            <p>Error: {label}</p>
          </div>
        }
        <button onClick={onClose} >
          <FaTimes />
        </button>
      </div>
  );
};

export default Transaction;