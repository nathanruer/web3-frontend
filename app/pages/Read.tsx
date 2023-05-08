import { useState } from 'react';
import { ethers } from 'ethers';

import { SetGetNumber_contractABI, SetGetNumber_contractAddress } from '@/data/constants';
import Heading from '../components/Heading';
import Button from '../components/Button';

const Read = () => {
  const [number, setNumber] = useState('');

  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_GOERLI)
  const handleClick = async () => {
    const contract = new ethers.Contract(
      SetGetNumber_contractAddress, 
      SetGetNumber_contractABI,
      provider
    );
    const value = await contract.getNumber();
    setNumber(value.toString());
  }

  return (
    <div id="read">
      <Heading
        title="Read a smart contract"
        subtitle="Calling a smart contract read-only method"
      />

      <div className="flex flex-col w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3">
        <div className='flex justify-center'>
          <Button label="Get number" onClick={handleClick} />
        </div>

        <div className='flex justify-center pt-3'>
          {number && <p>Number: {number}</p>}
        </div>
      </div>
    </div>
  );
};

export default Read;
