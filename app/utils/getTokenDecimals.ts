import { ethers } from 'ethers';

export const getTokenDecimals = async (tokenAddress: string): Promise<number> => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET);
  const tokenContract = new ethers.Contract(tokenAddress, ['function decimals() view returns (uint8)'], provider);
  const decimals = await tokenContract.decimals();
  return decimals;
};