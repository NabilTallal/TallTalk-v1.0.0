import { memo } from "react";
import LiquidChrome from "./LiquidChrome.jsx";

const AnimatedBackground = memo(() => (
    <LiquidChrome
        baseColor={[0.11, 0.15, 0.1]}
        speed={0.3}
        amplitude={0.6}
        interactive={true}
    />
));

export default AnimatedBackground;