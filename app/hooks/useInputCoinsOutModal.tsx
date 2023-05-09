import { create } from 'zustand';

interface InputCoinsOutModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useInputCoinsOutModal = create<InputCoinsOutModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useInputCoinsOutModal;