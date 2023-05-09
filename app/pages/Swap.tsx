'use client';
import { useState } from "react";

import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import ConnectWalletButton from '../components/ConnectWalletButton';

import useInputCoinsModal from "../hooks/useInputCoinsModal";
import InputCoinsModal from "../components/modals/InputCoinsModal";
import Button from "../components/Button";
import Heading from "../components/Heading";

const Swap = () => {
  const inputCoinsModal = useInputCoinsModal();

  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork()
  const { pendingChainId, switchNetwork } = useSwitchNetwork()

  const [token, setToken] = useState("ETH");
  const [tokenAdress, setTokenAddress] = useState("")
  const [amount, setAmount] = useState("");

  const handleSelectTokenLabel = (tokenLabel: string) => {
    setToken(tokenLabel);
  };
  const handleSelectTokenAddress = (tokenAddress: string) => {
    setTokenAddress(tokenAddress);
  };

  function handleSwitchToLocalhost() {
    switchNetwork?.(3137)
  }

  async function handleClick() {
    console.log(token)
    console.log(tokenAdress)
  }

  return (
    <div id="swap">
      <Heading  
        title="Swap"
        subtitle="Swap ERC20 tokens using Uniswap V3 (only on Mainnet localhost)"
      />
      <div className="w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3 border shadow-md shadow-white">
        <div className="p-3 flex flex-col justify-center text-black">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="10"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 rounded-xl bg-transparent text-white"
            />
            <button onClick={inputCoinsModal.onOpen} className="text-white">
              {token}
            </button>
          </div>

          <div className='flex justify-center pt-4'>
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
      </div>

      <InputCoinsModal 
        onSelectTokenLabel={handleSelectTokenLabel}
        onSelectTokenAddress={handleSelectTokenAddress}
      />
    </div>
  );
};

export default Swap;
