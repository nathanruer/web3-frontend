'use client';

import useInputCoinsModal from "@/app/hooks/useInputCoinsModal";
import Modal from "./Modal";
import { coins } from "@/data/constants";

interface InputCoinsModalProps {
  onSelectTokenLabel: (token: string) => void;
  onSelectTokenAddress: (token: string) => void;
}

const InputCoinsModal = ({ onSelectTokenLabel, onSelectTokenAddress }: InputCoinsModalProps) => {
  const inputCoinsModal = useInputCoinsModal();

  const handleSelectToken = (token: string, address: string) => {
    onSelectTokenLabel(token);
    onSelectTokenAddress(address);
    inputCoinsModal.onClose();
  };

  const bodyContent = (
    <div className="flex flex-col">
      {coins.map((item) => (
        <div key={item.label}>
          <button
            className="flex w-full p-2 rounded justify-start"
            onClick={() => handleSelectToken(item.label, item.address)}
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

export default InputCoinsModal;
