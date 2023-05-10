import { ethers } from 'ethers';
import QuoterAbi from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import { getTokenDecimals } from './getTokenDecimals';

export const quoteAmount = async (
  tokenInAddress: string, 
  tokenOutAddress: string, 
  amountIn: string
  ) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET);
  const quoterContract = new ethers.Contract(
    '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
    QuoterAbi.abi,
    provider
  );

  const tokenInDecimals = await getTokenDecimals(tokenInAddress);
  const tokenOutDecimals = await getTokenDecimals(tokenOutAddress);

  const amountQuoted = await quoterContract.callStatic.quoteExactInputSingle(
    tokenInAddress,
    tokenOutAddress,
    '3000',
    ethers.utils.parseUnits(amountIn, tokenInDecimals),
    '0'
  );

  const quotedAmountFormatted = ethers.utils.formatUnits(amountQuoted.toString(), tokenOutDecimals);
  
  return quotedAmountFormatted;
};