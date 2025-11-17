import { axiosInstance } from "./axios.js";

export const chatService = {
    getMessagesByUserId: (userId) => axiosInstance.get(`/messages/${userId}`),
    sendMessage: (userId, messageData) => axiosInstance.post(`/messages/send/${userId}`, messageData),
    deleteMessageForEveryone: (messageId) => axiosInstance.put(`/messages/deleteForAll/${messageId}`),
    getAllContacts: () => axiosInstance.get("/messages/contacts"),
    getMyChatPartners: () => axiosInstance.get("/messages/chats"),
};
