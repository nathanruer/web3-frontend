'use client';

import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, usePrepareSendTransaction, useWaitForTransaction } from 'wagmi';
import ConnectWalletButton from '../components/ConnectWalletButton';

import Button from '../components/Button';
import Transaction from '../components/Transaction';
import Input from '../components/Input';
import Heading from '../components/Heading';

const Send = () => {
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { address, isConnected } = useAccount();

  const [toAddress, setToAddress] = useState('');
  const [value, setValue] = useState('');

  const weiValue = value ? `${parseFloat(value) * 10 ** 18}` : '0';
  const { config } = usePrepareSendTransaction({
    request: {
      to: toAddress,
      value: weiValue,
    },
  })
  const { data, sendTransaction = () => Promise.resolve(), error } = useSendTransaction(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({hash: data?.hash,})

  useEffect(() => {
    if (isLoading) {
      setIsLoadingModalOpen(true);
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) {
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 10000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error || isError) {
      setIsErrorModalOpen(true);
      setTimeout(() => {
        setIsErrorModalOpen(false);
      }, 10000);
    }
  }, [error, isError]);

  async function handleClick() {
    try {
      sendTransaction();
    } catch (error) {
      console.error(`Failed to send transaction: ${error}`);
    }
  }

  return (
    <div>
      <Heading
        title="Send"
        subtitle="Send ETH or any native cryptocurrency to any address on any EVM network !" 
      />
      <div className="w-2/3 lg:w-1/3 mx-auto rounded-xl font-semibold p-3 
      border shadow-md shadow-white">
        <div className='p-3 flex flex-col justify-center text-black'>
          <Input
            id= "Address"
            label= "Address"
            type= "text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
           />
          <Input
            id= "Vaue"
            label= "Value"
            type= "number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
           />
          <div className='flex justify-center'>
            {isConnected ? (
              <Button label='Send' onClick={handleClick} />
            ) : (
              <ConnectWalletButton />
            )}
          </div>
        </div>
      </div>

      {isLoadingModalOpen && isLoading && 
        <Transaction
          isLoading 
          bgColor="bg-white"
          textColor="text-gray-900"
          onClose={() => setIsLoadingModalOpen(false)} 
        />
      }
      {isSuccessModalOpen && isSuccess && 
        <Transaction
          isSuccess
          bgColor="bg-green-400"
          textColor="text-white"
          label={`${data?.hash}`} 
          onClose={() => setIsSuccessModalOpen(false)} 
        />
      }
      {isErrorModalOpen && (error || isError) &&
        <Transaction
          bgColor="bg-red-400"
          textColor="text-white"
          isError
          label={`${error}`}
          onClose={() => setIsErrorModalOpen(false)} 
        />
      }
    </div>
  );
};

export default Send;
