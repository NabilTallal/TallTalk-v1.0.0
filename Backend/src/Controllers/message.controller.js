import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../utils/cloudinary.util.js";
import {getReceiverSocketId, io} from "../utils/socket.util.js";

const GENERIC_SERVER_ERROR = "Internal server error.";

export const getAllUsers = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const otherUsers = await User.find({ _id : {$ne : loggedInUserId}}).select("-password");

        res.status(200).json(otherUsers);
    } catch (error) {
        console.error("Error while retrieving users :", error);
        return res.status(500).json({message : GENERIC_SERVER_ERROR});
    }
};

export const getMessagesByUserId = async(req, res) => {
    try {
        const userId = req.user._id;
        const {userId : chatPartnerId} = req.params;

        const messages = await Message.find({
            $or : [
                {senderId: userId, receiverId: chatPartnerId},
                {senderId: chatPartnerId, receiverId: userId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.error("Error occurred while getting messages :", error);
        return res.status(500).json({message : GENERIC_SERVER_ERROR});
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { userId: receiverId } = req.params;
        const senderId = req.user._id;

        if( !text && !image ) {
            return res.status(400).json({message: "Text/Image is required."});
        }

        if( senderId.equals(receiverId)) {
            return res.status(400).json({message: "Cannot send message to yourself."});
        }

        const receiverExists = await User.exists({ _id : receiverId });

        if(!receiverExists) {
            return res.status(400).json({message: "Receiver is not found."})
        }

        let imageUrl;

        if(image) {
            const uploadedImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadedImage.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();


        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch( error) {
        console.error("Error in sendMessage controller : ", error);
        return res.status(500).json({message: GENERIC_SERVER_ERROR});
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: loggedInUserId}, {receiverId: loggedInUserId}
            ]
        });

        const chatPartnersIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
                )
            ),
        ];

        const chatPartners = await User.find({_id: {$in: chatPartnersIds}}).select("-password");

        res.status(200).json(chatPartners);

    } catch (error) {
        console.error("Error in getChatPartners controllers :", error);
        res.status(500).json({message: GENERIC_SERVER_ERROR});
    }
};

export const deleteMessageForEveryone = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const userId = req.user._id;

        const message = await Message.findById(messageId);

        if(!message) {
            return res.status(404).json({message : "Message not found."});
        }

        if(!message.senderId.equals(userId)) {
            return res.status(403).json({message : "You can only delete your own messages."});
        }

        message.deletedForAll = true;
        await message.save();

        const receiverSocketId = getReceiverSocketId(message.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("messageDeleted", messageId);
        }

        res.status(200).json({ message: "Message deleted for everyone.", messageId });
    } catch(error) {
        console.error("Error in deleteMessageForEveryone :", error);
        return res.status(500).json({message: GENERIC_SERVER_ERROR});
    }
}

