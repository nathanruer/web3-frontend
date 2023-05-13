'use client';

import useInputCoinsModal from "@/app/hooks/useInputCoinsOutModal";
import Modal from "./Modal";
import { coins } from "@/data/constants";

interface InputCoinsOutModalProps {
  onSelectTokenLabel: (token: string) => void;
  onSelectTokenAddress: (token: string) => void;
  onSelectTokenGeckoId: (token: string) => void;
}

const InputCoinsOutModal = ({ onSelectTokenLabel, onSelectTokenAddress, onSelectTokenGeckoId }: InputCoinsOutModalProps) => {
  const inputCoinsModal = useInputCoinsModal();

  const handleSelectToken = (token: string, address: string, geckoId: string) => {
    onSelectTokenLabel(token);
    onSelectTokenGeckoId(geckoId);
    onSelectTokenAddress(address);
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
