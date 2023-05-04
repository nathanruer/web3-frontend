'use client';

import { useContractRead } from 'wagmi'

import { SetGetNumber_contractABI, SetGetNumber_contractAddress } from '@/data/constants';

import Heading from '../components/Heading';
import { useState } from 'react';
import Button from '../components/Button';

const Read = () => {
  const [ number, setNumber ] = useState('')
  
  const { data, isError, isLoading } = useContractRead({
    address: SetGetNumber_contractAddress,
    abi: SetGetNumber_contractABI,
    functionName: 'getNumber',
    watch: true
  })

  const handleClick = () => {
    setNumber(parseInt(data?._hex, 16));
  }
  
  return (
    <div id="read">
      <Heading
        title="Read a smart contract"
        subtitle="Calling a smart contract read-only method" 
      />

      <div className="flex flex-col w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3">
        <div className='flex justify-center'>
          { isLoading &&
            <p>Loading</p>
          } { isError &&
            <p>Connect wallet</p>
          } { !isLoading && !isError &&
            <Button label="Read" onClick={handleClick} />
          }
        </div>
        
        <div className='flex justify-center pt-3'>
        { number &&
          <p>
            Number: {number}
          </p>
        }
        </div>
      </div>
    </div>
  );
};

export default Read;
