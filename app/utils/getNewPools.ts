import { ethers } from 'ethers';

export async function getNewPools(
  handlePairCreated: (token0: string, token1: string, pair: string) => void
) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET);
  const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
  const factoryAbi = [
    'event PairCreated(address indexed token0, address indexed token1, address pair, uint)'
  ];

  const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);

  factoryContract.on('PairCreated', handlePairCreated);
  return () => {
    factoryContract.off('PairCreated', handlePairCreated);
  };
}
