'use client';
import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, usePrepareSendTransaction, useWaitForTransaction } from 'wagmi';
import ConnectWalletButton from '../ConnectWalletButton';

import Button from '../Button';
import TransactionModal from '../modals/TransactionModal';
import Input from '../Input';

const Send = () => {
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
  const { data, sendTransaction = () => Promise.resolve() } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({hash: data?.hash,})

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
        <TransactionModal
          isLoading 
          label={`${data?.hash}`} 
          onClose={() => setIsLoadingModalOpen(false)} 
        />}
      {isSuccessModalOpen && isSuccess && 
        <TransactionModal
          label={`${data?.hash}`} 
          onClose={() => setIsSuccessModalOpen(false)} 
        />}
    </div>
  );
};

export default Send;
