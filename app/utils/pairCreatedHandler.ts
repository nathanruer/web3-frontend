import { ethers } from 'ethers';
import pairAbi from '../../data/pairAbi.json';
import { erc20ABI } from 'wagmi';

export async function pairCreatedHandler(
  token0: string,
  token1: string,
  pair: string,
  setNewPools: React.Dispatch<React.SetStateAction<{ 
    token0Label: string; 
    token0Address: string; 
    token1Label: string; 
    token1Address: string; 
    pair: string; 
    timestamp: number; 
  }[]>>
) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET);

    const pairContract = new ethers.Contract(pair, pairAbi, provider);

    // Check if liquidity added
    const [reserve0, reserve1] = await pairContract.getReserves();
    if (reserve0 > 0 && reserve1 > 0) {
      const token0Contract = new ethers.Contract(token0, erc20ABI, provider);
      const token0Symbol = await token0Contract.symbol();

      const token1Contract = new ethers.Contract(token1, erc20ABI, provider);
      const token1Symbol = await token1Contract.symbol();

      const blockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(blockNumber);
      const timestamp = block.timestamp;

      setNewPools(prevPools => {
        const existingPair = prevPools.find(pool => pool.pair === pair);
        if (existingPair) {
          return prevPools; // Don't add again the pair if it is already added
        }
      
        return [
          ...prevPools,
          {
            token0Label: `${token0Symbol}`,
            token0Address: `${token0}`,
            token1Label: `${token1Symbol}`,
            token1Address: `${token1}`,
            pair,
            timestamp
          }
        ];
      });      
    }
  } catch (error) {
    console.log("Error while looking for new pair created:", error);
  }
}
