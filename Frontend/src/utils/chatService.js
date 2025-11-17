import { axiosInstance } from "./axios.js";

export const chatService = {
    getMessagesByUserId: (userId) =>
        axiosInstance.get(`/messages/users/${userId}/messages`),

    sendMessage: (userId, messageData) =>
        axiosInstance.post(`/messages/users/${userId}/messages`, messageData),

    deleteMessageForEveryone: (messageId) =>
        axiosInstance.put(`/messages/${messageId}/deleteForAll`),

    getAllContacts: () => axiosInstance.get("/messages/contacts"),

    getMyChatPartners: () => axiosInstance.get("/messages/chats"),
};
