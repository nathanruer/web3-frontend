import { ethers } from 'ethers';

import { getTokenDecimals } from './getTokenDecimals';

const uniswapRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

export const quoteAmount = async (
  tokenInAddress: string,
  tokenOutAddress: string,
  amountIn: string
) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET);
  const uniswapRouter = new ethers.Contract(
    uniswapRouterAddress,
    [
      'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)'
    ],
    provider
  );

  let path: string[];
  try {
    path = [tokenInAddress, tokenOutAddress];
    await uniswapRouter.getAmountsOut(ethers.utils.parseEther(amountIn), path);
  } catch {
    try {
      // if no direct path -> pass per ETH 
      const WETHAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
      path = [tokenInAddress, WETHAddress, tokenOutAddress];
      await uniswapRouter.getAmountsOut(ethers.utils.parseEther(amountIn), path);
    } catch {
      throw new Error('Impossible to find a trading path');
    }
  }

  const amountsOut = await uniswapRouter.getAmountsOut(ethers.utils.parseEther(amountIn), path);
  const estimatedAmountOut = amountsOut[amountsOut.length - 1];

  const tokenOutDecimals = await getTokenDecimals(tokenOutAddress);

  const formattedAmountOut = ethers.utils.formatUnits(
    estimatedAmountOut,
    tokenOutDecimals
  );

  return formattedAmountOut;
};

