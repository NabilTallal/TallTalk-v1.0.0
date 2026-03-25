import { MessageCircleIcon } from "lucide-react";

const NoChatHistory = ({ name }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6 ">
            <div className="w-16 h-16 rounded-2xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center mb-6 shadow-lg shadow-lime-500/5">
                <MessageCircleIcon className="size-8 text-lime-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                No messages with {name} yet
            </h3>
            <p className="text-neutral-200 text-sm max-w-md mb-6">
                This space is empty for now. Drop the first message and start something real.
            </p>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-lime-500/40 to-transparent mb-6"></div>
            <div className="flex flex-wrap gap-3 justify-center">
                <button className="px-4 py-2 text-xs font-medium text-lime-400 bg-lime-500/10 border border-lime-500/20 rounded-xl hover:bg-lime-500/20 hover:scale-105 transition-all duration-200">
                    👋 Break the silence
                </button>
                <button className="px-4 py-2 text-xs font-medium text-lime-400 bg-lime-500/10 border border-lime-500/20 rounded-xl hover:bg-lime-500/20 hover:scale-105 transition-all duration-200">
                    ⚡ Say something bold
                </button>
                <button className="px-4 py-2 text-xs font-medium text-lime-400 bg-lime-500/10 border border-lime-500/20 rounded-xl hover:bg-lime-500/20 hover:scale-105 transition-all duration-200">
                    🚀 Start the convo
                </button>
            </div>
        </div>
    );
};

export default NoChatHistory;