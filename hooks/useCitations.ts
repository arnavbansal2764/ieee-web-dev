import { create } from "zustand";

interface Citations {
  isOpen: boolean;
  citations: any[];
  onOpen: (newCitations: any[]) => void;
  onClose: () => void;
}

const useCitations = create<Citations>((set) => ({
  isOpen: false,
  citations: [],
  onOpen: (newCitations) => set({ isOpen: true, citations: newCitations }),
  onClose: () => set({ isOpen: false, citations: [] }),
}));

export default useCitations;
