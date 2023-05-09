import { create } from 'zustand';

interface InputCoinsInModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useInputCoinsInModal = create<InputCoinsInModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useInputCoinsInModal;