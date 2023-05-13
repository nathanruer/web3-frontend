'use client';

import useInputCoinsModal from "@/app/hooks/useInputCoinsInModal";
import Modal from "./Modal";
import { coins } from "@/data/constants";

interface InputCoinsInModalProps {
  onSelectTokenLabel: (token: string) => void;
  onSelectTokenAddress: (token: string) => void;
  onSelectTokenGeckoId: (token: string) => void;
}

const InputCoinsInModal = ({ onSelectTokenLabel, onSelectTokenAddress, onSelectTokenGeckoId }: InputCoinsInModalProps) => {
  const inputCoinsModal = useInputCoinsModal();

  const handleSelectToken = (token: string, address: string, geckoId: string) => {
    onSelectTokenLabel(token);
    onSelectTokenAddress(address);
    onSelectTokenGeckoId(geckoId);
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

export default InputCoinsInModal;
