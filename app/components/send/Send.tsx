'use client';

import { useState } from 'react';
import { useAccount, useSendTransaction, usePrepareSendTransaction, useWaitForTransaction } from 'wagmi';
import ConnectWalletButton from '../ConnectWalletButton';

import Button from '../Button';

const Send = () => {
  const [toAddress, setToAddress] = useState('');
  const [value, setValue] = useState('');

  const { address, isConnected } = useAccount();

  const weiValue = value ? `${parseFloat(value) * 10 ** 18}` : '0';
  const { config } = usePrepareSendTransaction({
    request: {
      to: toAddress,
      value: weiValue,
    },
  })
  const { data, sendTransaction = () => Promise.resolve() } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({hash: data?.hash,})

  async function handleClick() {
    try {
      sendTransaction();
    } catch (error) {
      console.error(`Failed to send transaction: ${error}`);
    }
  }

  return (
    <div className='p-5'>
      <div className="w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3 ">
        <div className='p-3 flex flex-col justify-center text-black'>
          <input
            type='text'
            placeholder='Enter address'
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className='p-2 mb-2 rounded-lg border-2'
          />
          <input
            type='number'
            placeholder='Enter amount'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='p-2 mb-2 rounded-lg border-2'
          />
          <div className='flex justify-center'>
            {isConnected ? (
              <Button label='Send' onClick={handleClick} />
            ) : (
              <ConnectWalletButton />
            )}
          </div>

          {/* TODO: CREATE SENDING/SUCCESS MODALS */}
          {isLoading && 'Sending'}
          {isSuccess && 'Success'}
        </div>
      </div>
    </div>
  );
};

export default Send;
