'use client';
import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { erc20ABI } from 'wagmi'
import pairAbi from '../../data/pairAbi.json';
import Heading from '../components/Heading';

const NewPools = () => {
  const [newPools, setNewPools] = useState<{ token0: string; token1: string; pair: string; }[]>([]);

  const pairCreatedHandler = useCallback(async (token0: string, token1: string, pair: string) => {
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
  
        setNewPools(prevPools => [...prevPools, { token0: `${token0Symbol} (${token0})`, token1: `${token1Symbol} (${token1})`, pair }]);
      }
    } catch (error) {
      console.log("Error while looking for new pair created:", error);
    }
  }, []);

  useEffect(() => {
    async function getNewPools() {
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_MAINNET);
      const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
      const factoryAbi = [
        'event PairCreated(address indexed token0, address indexed token1, address pair, uint)'
      ];

      const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);

      factoryContract.on('PairCreated', pairCreatedHandler);
      return () => {
        factoryContract.off('PairCreated', pairCreatedHandler);
      };
    }

    getNewPools();
  }, [pairCreatedHandler]);

  return (
    <div>
      <Heading  
        title="New pools"
        subtitle="Listen to new Uniswap V2 pools on Ethereum Mainnet!"
      />

      {newPools.reverse().map((pool, index) => (
        <div key={index}>
          <div className="w-full font-light px-20 py-5">
            <div className='border py-3 px-5 rounded-xl'>
              <p className='font-semibold'>
                New pair just created!
              </p>
              <div className='py-2'>
                <p>{pool.token0} - {pool.token1}</p>
                <p>Pair address : {pool.pair}</p>
                <p>
                  <a
                    target="_blank"
                    href={`https://dexscreener.com/ethereum/${pool.pair}`}
                    className='hover:opacity-80 transition'
                  >
                    Dexscreener
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewPools;
