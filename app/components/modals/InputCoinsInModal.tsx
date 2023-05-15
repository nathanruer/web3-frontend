'use client';

import { useState, useEffect } from "react";
import useInputCoinsModal from "@/app/hooks/useInputCoinsInModal";
import { useToken } from "wagmi";
import Modal from "./Modal";
import { coins } from "@/data/constants";

interface InputCoinsInModalProps {
  onSelectToken: (tokenLabel: string, tokenAddress: string, tokenGeckoId: string) => void;
}

const InputCoinsInModal = ({ onSelectToken }: InputCoinsInModalProps) => {
  const inputCoinsModal = useInputCoinsModal();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: verifiedToken } = useToken({
    address: `0x${searchTerm.slice(2)}` || "",
  });

  const handleSelectToken = (token: string, address: string, geckoId: string) => {
    onSelectToken(token, address, geckoId);
    inputCoinsModal.onClose();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoins = coins.filter((item) => {
    const isAddressExactMatch = item?.address?.toLowerCase() === searchTerm.toLowerCase();
    const isLabelMatch = item?.symbol?.toLowerCase().includes(searchTerm.toLowerCase());
    return isAddressExactMatch || (isLabelMatch && !isAddressExactMatch);
  });

  const isAddressDefined = filteredCoins.some(item => item?.address?.toLowerCase() === searchTerm.toLowerCase());

  const tokensToDisplay = isAddressDefined ? filteredCoins : verifiedToken ? [verifiedToken, ...filteredCoins] : filteredCoins;

  const bodyContent = (
    <div className="flex flex-col">
      <div className={`rounded mb-4 border hover:border-white transition
      ${isInputFocused ? 'border-white ' : 'border-gray-500'}`}>
        <input
          type="text"
          placeholder="Search... (Symbol or Address)"
          className="p-2 w-full"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </div>
      {tokensToDisplay.map((item) => (
        <div key={item?.symbol}>
          <button
            className="flex w-full p-2 rounded justify-start"
            onClick={() => {
              if (item && "geckoId" in item) {
                handleSelectToken(item.symbol, item.address, item.geckoId);
              } else {
                handleSelectToken(item?.symbol || "", item?.address || "", "");
              }
            }}
          >
            {item?.symbol || ""}
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
