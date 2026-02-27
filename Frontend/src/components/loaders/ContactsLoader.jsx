function ContactsLoader() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-lime-800/20">
            <div className="w-full max-w-2xl space-y-4 px-4">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="p-4 rounded-2xl bg-neutral-900/10 animate-pulse"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-900/20" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-3/4 rounded bg-neutral-900/20" />
                                <div className="h-3 w-1/2 rounded bg-neutral-900/10" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactsLoader;