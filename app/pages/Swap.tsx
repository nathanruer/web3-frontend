'use client';

import { useState } from "react";

import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import ConnectWalletButton from '../components/ConnectWalletButton';

import Heading from "../components/Heading"
import Button from "../components/Button"
import Input from "../components/Input";

const Swap = () => {
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork()
  const { pendingChainId, switchNetwork } = useSwitchNetwork()

  const [tokenIn, setTokenIn] = useState('')
  const [tokenOut, setTokenOut] = useState('')
  const [amountIn, setAmountIn] = useState('')
  const [amountOut, setAmountOut] = useState('')

  async function handleClick() {
    try {
      console.log('Swap')
    } catch (error) {
      console.error(`Failed to send transaction: ${error}`);
    }
  }

  function handleSwitchToLocalhost() {
    switchNetwork?.(3137)
  }

  return (
    <div id="swap">
      <Heading  
        title="Swap"
        subtitle="Swap ERC20 tokens using Uniswap V3 (only on Mainnet localhost)"
      />

      <div className="w-2/3 lg:w-1/2 mx-auto rounded-xl font-semibold p-3 
      border shadow-md shadow-white">
        <div className='p-3 flex flex-col justify-center text-black'>
          <div className="flex items-center gap-2">
            <div className="w-1/3">
              <Input
                id= "AmountIn"
                label= "Amount In"
                type= "decimal"
                value={amountIn}
                onChange={(e) => setAmountIn(e.target.value)}
              />
            </div>
            <Input
              id= "TokenIn"
              label= "Token In"
              type= "text"
              value={tokenOut}
              onChange={(e) => setTokenIn(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1/3">
              <Input
                id= "AmountOut"
                label= "Amount Out"
                type= "decimal"
                value={amountOut}
                onChange={(e) => setAmountOut(e.target.value)}
              />
            </div>
            <Input
              id= "TokenOut"
              label= "Token Out"
              type= "text"
              value={tokenOut}
              onChange={(e) => setTokenOut(e.target.value)}
            />
          </div>

          <div className='flex justify-center'>
            {isConnected ? (
              chain?.name === 'Localhost' ? (
                <Button label='Swap' onClick={handleClick} />
              ) : (
                <Button label='Switch to Localhost' onClick={handleSwitchToLocalhost} />
              )
            ) : (
              <ConnectWalletButton />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Swap