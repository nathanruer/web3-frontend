'use client';

import useInputCoinsModal from "@/app/hooks/useInputCoinsOutModal";
import Modal from "./Modal";
import { coins } from "@/data/constants";

interface InputCoinsOutModalProps {
  onSelectToken: (    
    tokenLabel: string, 
    tokenAddress: string, 
    tokenGeckoId: string 
  ) => void;
}

const InputCoinsOutModal = ({ onSelectToken }: InputCoinsOutModalProps) => {
  const inputCoinsModal = useInputCoinsModal();

  const handleSelectToken = (token: string, address: string, geckoId: string) => {
    onSelectToken(token, address, geckoId);
    inputCoinsModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col">
      {coins.map((item) => (
        <div key={item.label}>
          <button
            className="flex w-full p-2 rounded justify-start"
            onClick={() => handleSelectToken(item.label, item.address, item.geckoId)}
          >
            {item.label}
          </button>
          <hr />
        </div>
      ))}
    </div>
  );

  return (
    <Modal
      isOpen={inputCoinsModal.isOpen}
      onClose={inputCoinsModal.onClose}
      title="Select token"
      body={bodyContent}
    />
  );
};

export default InputCoinsOutModal;
