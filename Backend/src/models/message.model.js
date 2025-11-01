import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            trim: true,
            maxlength: 2000,
        },
        image: {
            type: String,
        },
        deletedForAll: {
            type: Boolean,
            default: false, // Messages are visible by default
        },
    },
    { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
