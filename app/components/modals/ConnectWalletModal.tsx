'use client';

import useConnectWalletModal from "@/app/hooks/useConnectWalletModal";

import Modal from "./Modal";
import WalletItem from "../navbar/WalletItem";

const ConnectWalletModal = () => {
  const connectWalletModal = useConnectWalletModal();

  const bodyContent = (
    <div className="grid grid-cols-2 items-center gap-3">
      <WalletItem 
        label="Metamask"
      />
      <WalletItem 
        label="Coinbase Wallet"
        disabled
      />
      <WalletItem 
        label="Wallet Connect"
        disabled
      />
    </div>
  )

  return (
    <Modal
      isOpen={connectWalletModal.isOpen}
      onClose={connectWalletModal.onClose}
      title="Connect Wallet"
      body={bodyContent}
    />
  )
}

export default ConnectWalletModal