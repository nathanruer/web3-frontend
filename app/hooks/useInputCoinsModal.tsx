import { create } from 'zustand';

interface InputCoinsModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useInputCoinsModal = create<InputCoinsModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useInputCoinsModal;