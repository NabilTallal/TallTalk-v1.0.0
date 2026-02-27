    import { MessageSquareMore } from "lucide-react";
    import TextType from "../effects/TextType.jsx";

    const NoConversationPlaceholder = () => {
        return (
            <div
                className="flex flex-col items-center justify-center h-full p-6
                           backdrop-blur-2xl border border-lime-400/20 shadow-xl
                           bg-gradient-to-b from-black/40 via-black/20 to-black/30"
            >
                {/* Logo Container */}
                <div
                    className="w-28 h-28 bg-lime-950/60 backdrop-blur-md
                               flex items-center justify-center mb-6
                               border border-lime-400/30 shadow-[0_0_30px_rgba(132,255,100,0.25)]
                               hover:shadow-[0_0_50px_rgba(132,255,100,0.45)]
                               transition-all duration-500 ease-in-out rounded-badge"
                >
                    <img
                        src="/logo.png"
                        alt="TallTalk Logo"
                        className="w-20 h-20 drop-shadow-[0_0_12px_rgba(132,255,100,0.7)]
                                   animate-float"
                    />
                </div>

                {/* App Name / Typing Effect */}
                <div className="text-2xl font-semibold text-white mb-4 font-serif text-center">
                    <TextType
                        text={["TallTalk", "The Best Chatting App", "Happy You Are Here!"]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                    />
                </div>

                {/* Placeholder Message */}
                <h3 className="text-lg font-semibold text-lime-300 mb-2 text-center">
                    Select a conversation
                </h3>
                <p className="text-gray-300 max-w-md text-center leading-relaxed">
                    Choose a contact from the sidebar to start chatting or continue a previous conversation.
                </p>
            </div>
        );
    };

    export default NoConversationPlaceholder;
