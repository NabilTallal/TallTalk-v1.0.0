import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../../stores/useChatStore.js";

function NoChatsFound() {
    const { setActiveTab } = useChatStore();

    return (
        <div className="flex items-center justify-center min-h-screen bg-lime-800/20 px-4">
            <div className="flex flex-col items-center text-center space-y-5 max-w-md">

                <div className="w-16 h-16 rounded-full bg-neutral-900/10 flex items-center justify-center">
                    <MessageCircleIcon className="w-8 h-8 text-neutral-800" />
                </div>

                <div>
                    <h4 className="text-neutral-900 font-medium mb-1">
                        No conversations yet
                    </h4>
                    <p className="text-neutral-700 text-sm">
                        Start a new chat by selecting a contact from the contacts tab
                    </p>
                </div>

                <button
                    onClick={() => setActiveTab("contacts")}
                    className="px-5 py-2 text-sm font-medium rounded-xl
                     bg-neutral-900 text-white
                     hover:opacity-90 transition-all duration-200"
                >
                    Find contacts
                </button>

            </div>
        </div>
    );
}

export default NoChatsFound;