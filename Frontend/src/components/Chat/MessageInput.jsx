import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore.js";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon, SmileIcon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

function MessageInput() {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const fileInputRef = useRef(null);
    const pickerRef = useRef(null);
    const inputRef = useRef(null);

    const { sendMessage } = useChatStore();

    // Close emoji picker when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(e.target) &&
                e.target !== inputRef.current
            ) {
                setShowEmojiPicker(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        sendMessage({
            text: text.trim(),
            image: imagePreview,
        });
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleEmojiClick = (emojiObject) => {
        setText((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
        inputRef.current?.focus();
    };

    return (
        <div className="p-4 border-t border-slate-700/50 relative">
            {imagePreview && (
                <div className="max-w-3xl mx-auto mb-3 flex items-center">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                            type="button"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-2 items-center">
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
                    placeholder="Type your message..."
                />

                {/* Emoji Button */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation(); // ✅ Prevent outside click handler from firing
                        setShowEmojiPicker((prev) => !prev);
                    }}
                    className="bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-3 transition-colors"
                >
                    <SmileIcon className="w-full h-full p-1.5" />
                </button>

                {/* Image Upload */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${
                        imagePreview ? "text-cyan-500" : ""
                    }`}
                >
                    <ImageIcon className="w-full h-full p-1.5" />
                </button>

                {/* Send Button */}
                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="bg-gradient-to-r from-lime-500 to-lime-600 text-white rounded-lg px-4 py-2 font-medium hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SendIcon className="w-full h-full" />
                </button>
            </form>

            {/* Emoji Picker Popup */}
            {showEmojiPicker && (
                <div
                    ref={pickerRef}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-14 right-0 z-50"
                    style={{ transform: 'translateX(-10%)' }}
                >
                    <EmojiPicker className="w-full h-full" onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
}

export default MessageInput;
