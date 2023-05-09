'use client';
import { useState } from "react";

import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import ConnectWalletButton from '../components/ConnectWalletButton';

import useInputCoinsInModal from "../hooks/useInputCoinsInModal";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import useInputCoinsOutModal from "../hooks/useInputCoinsOutModal";
import InputCoinsOutModal from "../components/modals/InputCoinsOutModal";
import InputCoinsInModal from "../components/modals/InputCoinsInModal";

const Swap = () => {
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork()
  const { pendingChainId, switchNetwork } = useSwitchNetwork()

  const [isInputInFocused, setIsInputInFocused] = useState(false);
  const [isInputOutFocused, setIsInputOutFocused] = useState(false);

  const inputCoinsInModal = useInputCoinsInModal();
  const inputCoinsOutModal = useInputCoinsOutModal();

  const [tokenInLabel, setTokenInLabel] = useState("ETH");
  const [tokenInAddress, setTokenInAddress] = useState("0x0")
  const [tokenOutLabel, setTokenOutLabel] = useState("Select token");
  const [tokenOutAddress, setTokenOutAddress] = useState("")
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");

  const handleSelectTokenInLabel = (tokenLabel: string) => {setTokenInLabel(tokenLabel)};
  const handleSelectTokenInAddress = (tokenAddress: string) => {setTokenInAddress(tokenAddress)};
  const handleSelectTokenOutLabel = (tokenLabel: string) => {setTokenOutLabel(tokenLabel)};
  const handleSelectTokenOutAddress = (tokenAddress: string) => {setTokenOutAddress(tokenAddress)};

  function handleSwitchToLocalhost() {switchNetwork?.(3137)};

  async function handleClick() {
    console.log("Swap de", amountIn, tokenInLabel, ":", tokenInAddress, "vers", tokenOutLabel, ":", tokenOutAddress)
  }

  return (
    <div>
      <Heading  
        title="Swap"
        subtitle="Swap ERC20 tokens using Uniswap V3 (only on Mainnet localhost)"
      />
      
      <div className="w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3 border
      shadow-md shadow-white">

        <div className={`p-3 flex flex-col justify-center text-black  mb-2
        rounded-xl hover:border
        ${isInputInFocused ? 'border ' : ''}`}>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="10"
              value={amountIn}
              onFocus={() => setIsInputInFocused(true)}
              onBlur={() => setIsInputInFocused(false)}
              onChange={(e) => setAmountIn(e.target.value)}
              className="w-full p-2 rounded-xl bg-transparent text-white"
            />
            <button
              onClick={inputCoinsInModal.onOpen}
              className="flex w-[220px] text-black bg-white py-2 px-4 hover:bg-white/80 
              transition rounded-xl items-center justify-between"
            >
              {tokenInLabel}<MdOutlineKeyboardArrowDown />
            </button>
          </div>
        </div>

        <div className={`p-3 flex flex-col justify-center text-black mb-2
        rounded-xl hover:border 
        ${isInputOutFocused ? 'border' : ''}`}>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="0"
              value={amountOut}
              onFocus={() => setIsInputOutFocused(true)}
              onBlur={() => setIsInputOutFocused(false)}
              onChange={(e) => setAmountOut(e.target.value)}
              className="w-full p-2 rounded-xl bg-transparent text-white"
            />
            <button
              onClick={inputCoinsOutModal.onOpen}
              className="flex w-[220px] text-black bg-white py-2 px-4 hover:bg-white/80 
              transition rounded-xl items-center justify-between"
            >
              {tokenOutLabel}<MdOutlineKeyboardArrowDown />
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
            {isConnected ? (
              chain?.name === 'Localhost' || 'Mainnet' ? (
                <Button label='Swap' onClick={handleClick} />
              ) : (
                <Button label='Switch to Localhost or' onClick={handleSwitchToLocalhost} />
              )
            ) : (
              <ConnectWalletButton />
            )}
          </div>
      </div>

      <InputCoinsInModal
        onSelectTokenLabel={handleSelectTokenInLabel}
        onSelectTokenAddress={handleSelectTokenInAddress}
      />
      <InputCoinsOutModal 
        onSelectTokenLabel={handleSelectTokenOutLabel}
        onSelectTokenAddress={handleSelectTokenOutAddress}
      />
    </div>
  );
};

export default Swap;
