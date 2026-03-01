import { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { useChatStore } from "../../stores/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceholder from "../Holders/NoChatHistoryPlaceholder.jsx";
import MessageInput from "./MessageInput.jsx";
import MessagesLoader from "../loaders/MessagesLoader.jsx";

function ChatContainer() {
    const {
        selectedUser,
        loadMessages,
        messages,
        isMessagesLoading,
        subscribeToMessages,
        unsubscribeFromMessages,
        deleteMessageForEveryone,
    } = useChatStore();
    const { authUser } = useAuthStore();
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
                                        <i className="opacity-70 italic">This message was deleted</i>
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
                    <NoChatHistoryPlaceholder name={selectedUser.fullName} />
                )}
            </div>

            <MessageInput />
        </>
    );
}

export default ChatContainer;
