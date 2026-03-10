import { create } from "zustand";
import toast from "react-hot-toast";

import { chatService } from "../utils/chatService.js";

export const userStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    isUsersLoading: false,

    // FETCH ALL CONTACTS
    loadAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await chatService.getAllContacts();
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load contacts");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    // FETCH CHAT PARTNERS
    loadMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await chatService.getMyChatPartners();
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load chats");
        } finally {
            set({ isUsersLoading: false });
        }
    },
}));
