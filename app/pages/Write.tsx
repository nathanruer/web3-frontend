'use client';

import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { SetGetNumber_contractABI, SetGetNumber_contractAddress } from '@/data/constants';

import Heading from '../components/Heading';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';

const Write = () => {
  const [inputValue, setInputValue] = useState('');

  const { config } = usePrepareContractWrite({
    address: SetGetNumber_contractAddress,
    abi: SetGetNumber_contractABI,
    functionName: 'setNumber',
    args: [inputValue],
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  async function handleClick() {
    try {
      console.log('clicked')
      if (write) {
        write();
      }
    } catch (error) {
      console.error(`Failed to send transaction: ${error}`);
    }
  }
  
  return (
    <div id="write">
      <Heading
        title="Write in a smart contract"
        subtitle="Calling a smart contract write-only method" 
      />

      <div className="w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3 
      border shadow-md shadow-white">
        <div className='p-3 flex flex-col justify-center text-black'>
          <Input
            id= "Number"
            label= "Number"
            type= "text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <div className='flex justify-center'>
            <Button label='Write' onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
