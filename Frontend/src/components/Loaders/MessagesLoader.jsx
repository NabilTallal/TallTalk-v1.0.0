function MessagesLoader() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-lime-800/20">
            <div className="w-full max-w-3xl space-y-6 px-4">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            index % 2 === 0 ? "justify-start" : "justify-end"
                        } animate-pulse`}
                    >
                        <div className="h-10 w-32 rounded-2xl bg-neutral-900/20" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MessagesLoader;