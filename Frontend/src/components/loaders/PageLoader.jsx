import { LoaderPinwheelIcon } from "lucide-react";

function PageLoader() {
    return (
        <div className="flex items-center justify-center h-screen bg-lime-800/20">
            <LoaderPinwheelIcon className="size-10 animate-spin text-neutral-900" />
        </div>
    );
}

export default PageLoader;