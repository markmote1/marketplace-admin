import {create} from "zustand"

interface useStoreModalStore {
    isOpen: boolean;
    title: string;
    description: string;
    onOpen: () => void;
    onClose: () => void;
}

export const useStoreModal = create<useStoreModalStore>((set) => ({
    isOpen: false,
    title: "",
    description: "",
    onOpen: () => {
        set({ isOpen: true });
    },
    onClose: () => {
        set({ isOpen: false });
    },
}));