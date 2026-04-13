import { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";
import { authStore } from "../../stores/authStore.js";
import { chatStore } from "../../stores/chatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistory from "../Holders/NoChatHistory.jsx";
import MessageComposer from "./MessageComposer.jsx";
import MessagesLoader from "../Loaders/MessagesLoader.jsx";

function ChatWindow() {
    const {
        selectedUser,
        loadMessages,
        messages,
        isMessagesLoading,
        subscribeToMessages,
        unsubscribeFromMessages,
        deleteMessageForEveryone,
    } = chatStore();
    const { authUser } = authStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (!selectedUser) return;
        loadMessages(selectedUser._id);
        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser, loadMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <>
            <ChatHeader />
            <div className="flex-1 px-6 py-8 overflow-y-auto">
                {isMessagesLoading ? (
                    <MessagesLoader />
                ) : messages.length > 0 ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                            >
                                <div
                                    className={`chat-bubble chat-bubble-neutral relative p-3.5 ${
                                        msg.senderId === authUser._id
                                            ? "bg-gradient-to-r from-yellow-300/40 to-lime-700/50 bg-lime-700/80 text-white shadow-[0_2px_12px_-2px_rgba(148,163,11,0.45)]"
                                            : "bg-black/60 text-white/90 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.45)] border-white/5"
                                    }`}
                                >
                                    {msg.deletedForAll ? (
                                        <i className="opacity-60 italic font-medium">This message was deleted by the sender.</i>
                                    ) : (
                                        <>
                                            {msg.image && (
                                                <img
                                                    src={msg.image}
                                                    alt="Shared"
                                                    className="rounded-lg h-48 object-cover mb-2"
                                                />
                                            )}
                                            {msg.text && <p>{msg.text}</p>}
                                        </>
                                    )}
                                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                        {/* Trash icon for sender */}
                                        {!msg.deletedForAll && msg.senderId === authUser._id && (
                                            <Trash2
                                                size={16}
                                                className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                                                onClick={() => deleteMessageForEveryone(msg._id)}
                                                title="Delete for Everyone"
                                            />
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </div>
                ) : (
                    <NoChatHistory name={selectedUser.fullName} />
                )}
            </div>

            <MessageComposer />
        </>
    );
}

export default ChatWindow;
