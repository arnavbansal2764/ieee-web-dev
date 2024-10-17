import { create } from "zustand";

interface Citations {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCitations = create<Citations>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCitations;
