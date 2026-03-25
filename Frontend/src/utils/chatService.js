import { axiosInstance } from "./axiosConfig.js";

export const chatService = {
    getMessagesByUserId: (userId) =>
        axiosInstance.get(`/messages/users/${userId}/messages`),

    sendMessage: (receiverId, messageData) =>
        axiosInstance.post(`/messages/users/send/${receiverId}/messages`, messageData),

    deleteMessageForEveryone: (messageId) =>
        axiosInstance.put(`/messages/${messageId}/deleteForAll`),

    getAllContacts: () => axiosInstance.get("/messages/contacts"),

    getMyChatPartners: () => axiosInstance.get("/messages/chats"),
};
