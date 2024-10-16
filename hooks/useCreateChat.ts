import { create } from 'zustand';

interface CreateChat {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreateChat = create<CreateChat>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

}));

export default useCreateChat;