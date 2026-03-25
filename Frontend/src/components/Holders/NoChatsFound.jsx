import { MessageCircleDashedIcon } from "lucide-react";
import { chatStore } from "../../stores/chatStore.js";

function NoChatsFound() {
    const { setActiveTab } = chatStore();

    return (
        <div className="flex justify-center h-full pt-24 px-6">
            <div className="flex flex-col items-center text-center max-w-md">

                {/* Icon */}
                <div className="w-16 h-16 mb-6 rounded-2xl
                        bg-lime-500/5 border border-lime-500/20
                        flex items-center justify-center
                        shadow-[0_0_30px_rgba(132,255,100,0.07)]">
                    <MessageCircleDashedIcon className="w-8 h-8 text-lime-400" />
                </div>

                {/* Text */}
                <h4 className="text-neutral-100 text-lg font-semibold mb-2 tracking-wide">
                    Nothing here yet
                </h4>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    Your chats will show up here.
                    Pick someone and start the first message.
                </p>

                {/* Button */}
                <button
                    onClick={() => setActiveTab("contacts")}
                    className="px-6 py-2.5 text-sm font-medium rounded-xl
                     bg-lime-500/10 text-lime-400
                     border border-lime-500/20
                     hover:bg-lime-500/20
                     hover:scale-105
                     active:scale-95
                     transition-all duration-200"
                >
                    Explore contacts
                </button>

            </div>
        </div>
    );
}

export default NoChatsFound;