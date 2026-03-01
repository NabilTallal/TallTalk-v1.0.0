import { create } from "zustand";
import toast from "react-hot-toast";

import { useAuthStore } from "./useAuthStore.js";
import { chatService } from "../utils/chatService.js";
import { socketService } from "../utils/socketService.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    chats: [],
    selectedUser: null,
    activeTab: "chats",
    isMessagesLoading: false,

    // STATE UPDATES
    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (user) => set({ selectedUser: user, messages: [] }),

    // ERROR HANDLER
    handleError: (error, fallback = "Something went wrong") => {
        toast.error(error?.response?.data?.message || fallback);
    },

    // CHAT ACTIONS
    loadMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await chatService.getMessagesByUserId(userId);
            set({ messages: res.data });
        } catch (error) {
            get().handleError(error, "Failed to load messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser, socket } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
            deletedForAll: false, // make sure new messages have this field
        };

        // Add optimistic message
        set({ messages: [...messages, optimisticMessage] });

        try {
            const res = await chatService.sendMessage(
                selectedUser._id,
                messageData
            );

            // Replace optimistic message with real one without reordering
            set((state) => ({
                messages: state.messages.map((m) =>
                    m._id === tempId ? res.data : m
                ),
            }));

            // Emit to socket so the receiver gets it in real-time
            socket.emit("sendMessage", res.data);
        } catch (error) {
            // Remove optimistic message on failure
            set((state) => ({
                messages: state.messages.filter((m) => m._id !== tempId),
            }));
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    deleteMessageForEveryone: async (messageId) => {
        try {
            await chatService.deleteMessageForEveryone(messageId);

            set((state) => ({
                messages: state.messages.map((msg) =>
                    msg._id === messageId ? { ...msg, deletedForAll: true } : msg
                ),
            }));
        } catch (error) {
            get().handleError(error, "Failed to delete message");
        }
    },

    // SOCKET HANDLING
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        // Remove existing listeners before subscribing
        socketService.off("newMessage");
        socketService.off("messageDeleted");

        socketService.on("newMessage", (msg) => {
            if (msg.senderId === selectedUser._id) {
                set((state) => ({ messages: [...state.messages, msg] }));
            }
        });

        socketService.on("messageDeleted", (messageId) => {
            set((state) => ({
                messages: state.messages.map((msg) =>
                    msg._id === messageId && !msg.deletedForAll
                        ? { ...msg, deletedForAll: true }
                        : msg
                ),
            }));
        });
    },

    unsubscribeFromMessages: () => {
        socketService.off("newMessage");
        socketService.off("messageDeleted");
    },
}));
