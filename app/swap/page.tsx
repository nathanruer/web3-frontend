'use client';
import { useState } from "react";

import { useAccount, useNetwork, useSwitchNetwork, useBalance } from 'wagmi'
import ConnectWalletButton from '../components/ConnectWalletButton';

import useInputCoinsInModal from "../hooks/useInputCoinsInModal";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Loader from "../components/Loader";
import useInputCoinsOutModal from "../hooks/useInputCoinsOutModal";
import InputCoinsOutModal from "../components/modals/InputCoinsOutModal";
import InputCoinsInModal from "../components/modals/InputCoinsInModal";

import { quoteAmount } from "../hooks/quoteAmount";

import { MdOutlineKeyboardArrowDown } from "react-icons/md"

const Swap = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const [isInputInFocused, setIsInputInFocused] = useState(false);
  const [isInputOutFocused, setIsInputOutFocused] = useState(false);

  const inputCoinsInModal = useInputCoinsInModal();
  const inputCoinsOutModal = useInputCoinsOutModal();

  const [tokenInLabel, setTokenInLabel] = useState("WETH");
  const [tokenInAddress, setTokenInAddress] = useState("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
  const [tokenOutLabel, setTokenOutLabel] = useState("USDC");
  const [tokenOutAddress, setTokenOutAddress] = useState("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
  const [amountIn, setAmountIn] = useState("1");
  const [amountOut, setAmountOut] = useState("");
  const [isAmountInLoading, setIsAmountInLoading] = useState(false);
  const [isAmountOutLoading, setIsAmountOutLoading] = useState(false);

  const handleSelectTokenInLabel = (tokenLabel: string) => {setTokenInLabel(tokenLabel)};
  async function handleSelectTokenInAddress(tokenAddress: string) {
    setTokenInAddress(tokenAddress)
    setIsAmountOutLoading(true);
    const amountOut = await quoteAmount(tokenAddress, tokenOutAddress, amountIn);
    setAmountOut(amountOut);
    setIsAmountOutLoading(false);
  };

  const handleSelectTokenOutLabel = (tokenLabel: string) => {setTokenOutLabel(tokenLabel)};
  async function handleSelectTokenOutAddress (tokenAddress: string) {
    setTokenOutAddress(tokenAddress)
    setIsAmountOutLoading(true);
    const amountOut = await quoteAmount(tokenInAddress, tokenAddress, amountIn);
    setAmountOut(amountOut);
    setIsAmountOutLoading(false);
  };

  const { data: tokenInBalance, isLoading: isTokenInBalanceLoading } = useBalance({
    address: address,
    token: `0x${tokenInAddress.slice(2)}`,
  });
  const { data: tokenOutBalance, isLoading: isTokenOutBalanceLoading } = useBalance({
    address: address,
    token: `0x${tokenOutAddress.slice(2)}`,
  });

  async function handleSwap() {
    console.log("Swap de", amountIn, tokenInLabel, ":", tokenInAddress, "vers", tokenOutLabel, ":", tokenOutAddress)
  }

  async function handleAmountInChanged(e: string) {
    setAmountIn(e);

    if (e === '') {
      setAmountOut('');
      return;
    } else if (e === '0') {
      setAmountOut('0');
      return;
    }
  
    setIsAmountOutLoading(true);
    const amountOut = await quoteAmount(tokenInAddress, tokenOutAddress, e);
    setAmountOut(amountOut);
    setIsAmountOutLoading(false);
  }

  async function handleAmountOutChanged(e: string) {
    setAmountOut(e);

    if (e === '') {
      setAmountIn('');
      return;
    } else if (e === '0') {
      setAmountIn('0');
      return;
    }

    setIsAmountInLoading(true);
    const amountIn = await quoteAmount(tokenOutAddress, tokenInAddress, e);
    setAmountIn(amountIn);
    setIsAmountInLoading(false);
  }
  
  return (
    <div>
      <Heading  
        title="Swap"
        subtitle="Swap ERC20 tokens using Uniswap (only on Mainnet localhost)"
      />
      
      <div className="w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3 border
      shadow-md shadow-white">

        <div className={`p-3 flex flex-col justify-center text-black  mb-2
        rounded-xl hover:border
        ${isInputInFocused ? 'border ' : ''}`}>
          <div className="flex items-center gap-2">
            {isAmountInLoading ?
            ( <div className="w-full p-2 rounded-xl bg-transparent text-white"><Loader color="white"/></div> )
            : ( 
            <input
              type="number"
              value={amountIn}
              onFocus={() => setIsInputInFocused(true)}
              onBlur={() => setIsInputInFocused(false)}
              onChange={(e) => handleAmountInChanged(e.target.value)}
              className="w-full p-2 rounded-xl bg-transparent text-white"
            />)}
            <button
              onClick={inputCoinsInModal.onOpen}
              className="flex w-[220px] text-black bg-white py-2 px-4 hover:bg-white/80 
              transition rounded-xl items-center justify-between"
            >
              {tokenInLabel}<MdOutlineKeyboardArrowDown />
            </button>
          </div>
          <div className="flex text-align justify-end p-1 text-gray-400 font-light text-sm">
            {isTokenInBalanceLoading ? (
              // TO DO : VERIFIER QU'ON EST SUR MAINNET OU LOCALHOST POUR L'INSTANT
              <p>Balance fetching...</p>
            ) : (
              <p>Balance: {tokenInBalance?.formatted ?? 0}</p>
            )}
          </div>
        </div>

        <div className={`p-3 flex flex-col justify-center text-black mb-2
        rounded-xl hover:border 
        ${isInputOutFocused ? 'border' : ''}`}>
          <div className="flex items-center gap-2">
            {isAmountOutLoading ?
            ( <div className="w-full p-2 rounded-xl bg-transparent text-white"><Loader color="white"/></div> )
            : ( 
            <input
              type="number"
              value={amountOut}
              onFocus={() => setIsInputOutFocused(true)}
              onBlur={() => setIsInputOutFocused(false)}
              onChange={(e) => handleAmountOutChanged(e.target.value)}
              className="w-full p-2 rounded-xl bg-transparent text-white"
            />)}

            <button
              onClick={inputCoinsOutModal.onOpen}
              className="flex w-[220px] text-black bg-white py-2 px-4 hover:bg-white/80 
              transition rounded-xl items-center justify-between"
            >
              {tokenOutLabel}<MdOutlineKeyboardArrowDown />
            </button>
          </div>
          <div className="flex text-align justify-end p-1 text-gray-400 font-light text-sm">
            {isTokenOutBalanceLoading ? (
              // TO DO : VERIFIER QU'ON EST SUR MAINNET OU LOCALHOST POUR L'INSTANT
              <p>Balance fetching...</p>
            ) : (
              <p>Balance: {tokenOutBalance?.formatted ?? 0}</p>
            )}
          </div>
        </div>

        <div className='flex justify-center'>
            {isConnected ? (
              chain?.name === 'Localhost' || 'Mainnet' ? (
                <Button label='Swap' onClick={handleSwap} />
              ) : (
                <Button label='Switch to Localhost or' onClick={() => switchNetwork?.(3137)} />
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
