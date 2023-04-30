import { create } from 'zustand';

interface ConnectWalletModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useConnectWalletModal = create<ConnectWalletModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useConnectWalletModal;
