'use client';

import { ethers } from 'ethers';
import { abi } from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'

import Button from "../components/Button";

const Quote = () => {
  
  const quoteAmount = async () => {
    console.log("quotting...")
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET)
    const quoterContract = new ethers.Contract(
      '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', 
      abi,
      provider
    );
    const amountOut = await quoterContract.callStatic.quoteExactInputSingle(
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      '3000',
      ethers.utils.parseEther('10'),
      '0',
    )
    console.log(ethers.utils.formatUnits(amountOut.toString(), 16))
  }

  return (
    <div className='flex justify-center'>
      <Button label='Quote' onClick={quoteAmount} />
    </div>
  );
};

export default Quote;
