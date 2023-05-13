'use client';
import { useEffect, useState, useCallback } from 'react';

import { getNewPools } from '../utils/getNewPools';
import { formatTimestamp } from '../utils/formatTimestamp';
import { pairCreatedHandler } from '../utils/pairCreatedHandler';

import Heading from '../components/Heading';

const NewPools = () => {
  const [newPools, setNewPools] = useState<{ 
    token0Label: string; 
    token0Address:string; 
    token1Label: string; 
    token1Address: string; 
    pair: string; 
    timestamp: number; 
  }[]>([]);
  const reversedNewPools = [...newPools].reverse();

  const handlePairCreated = useCallback(
    (token0: string, token1: string, pair: string) => {
      pairCreatedHandler(token0, token1, pair, setNewPools);
    },
    [pairCreatedHandler, setNewPools]
  );

  useEffect(() => {
    getNewPools(handlePairCreated);
  }, []);
  

  return (
    <div>
      <Heading  
        title="New pools"
        subtitle="Listen to new Uniswap V2 pools on Ethereum Mainnet!"
      />

      {reversedNewPools.map((pool, index) => (
        <div key={index}>
          <div className="w-full font-light px-20 py-5">
            <div className='border py-3 px-5 rounded-xl'>
              <p className='text-xs text-gray-400'>
                {formatTimestamp(pool.timestamp)}
              </p>
              <p className='font-semibold'>
                New pair just created!
              </p>
              <div className='py-2'>
                <p className="hidden sm:block">{pool.token0Label} ({pool.token0Address}) - {pool.token1Label} ({pool.token1Address})</p>
                <p className="sm:hidden">{`${pool.token0Label} (${pool.token0Address.substring(0, 5)}...${pool.token0Address.substring(pool.token0Address.length - 5)}) - ${pool.token1Label} (${pool.token1Address.substring(0, 5)}...${pool.token1Address.substring(pool.token1Address.length - 5)})`}</p>

                <p className="hidden sm:block">Pair address: {pool.pair}</p>
                <p className="sm:hidden">{`Pair adress: ${pool.pair.substring(0, 5)}...${pool.pair.substring(pool.pair.length - 5)}`}</p>
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
