'use client';

import Loader from "../Loader";

import { FaTimes } from 'react-icons/fa';

interface TransactionModalProps {
  isLoading?: boolean;
  label?: string;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isLoading,
  label,
  onClose
}) => {
  return (
    <div className="flex absolute right-10 top-24 py-2 px-4
    shadow-xl bg-white rounded-xl text-gray-900">
        {isLoading ? (
          <div className="flex flex-row items-center">
            <Loader />
            <p>Transaction loading...</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <p>Transaction successful !</p>
              {label && (
                <p>
                  <a
                    href={`https://etherscan.io/tx/${label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-900/90 transition"
                  >
                    Etherscan
                  </a>
                </p>
              )}
          </div>
        )}
        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>
  );
};

export default TransactionModal