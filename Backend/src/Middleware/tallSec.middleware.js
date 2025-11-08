import rateLimit from "express-rate-limit";
import helmet from "helmet";

export const applySecurityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https:"],
            styleSrc: ["'self'", "'unsafe-inline'", "https:"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https:"],
            fontSrc: ["'self'", "https:"],
            objectSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginResourcePolicy: { policy: "same-origin" },
});

const defaultLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 100, // 100 requests per IP per minute
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) =>
        res.status(429).json({ message: "Rate limit exceeded. Please try again later." }),
});

const allowedBots = /(google|bing|discord|slack)/i;
const disallowedBots = /(bot|crawler|spider|scraper)/i;

function isSpoofed(req) {
    const ua = req.get("user-agent") || "";
    const acceptLang = req.get("accept-language") || "";
    return /bot|crawler|spider/i.test(ua) && !acceptLang;
}

export const securityProtection = (options = {}) => {
    const limiter = options.limiter || defaultLimiter;

    return async (req, res, next) => {
        try {
            // Apply rate limiting
            await new Promise((resolve, reject) => {
                limiter(req, res, (err) => (err ? reject(err) : resolve()));
            });

            // Bot detection
            const ua = req.get("user-agent") || "";
            if (disallowedBots.test(ua) && !allowedBots.test(ua)) {
                console.warn(`Blocked bot UA: ${ua} IP: ${req.ip}`);
                return res.status(403).json({ message: "Bot access denied." });
            }

            // Spoofed bot detection
            if (isSpoofed(req)) {
                console.warn(`Spoofed bot detected UA: ${ua} IP: ${req.ip}`);
                return res.status(403).json({
                    message: "Malicious bot activity detected.",
                    error: "Spoofed bot detected",
                });
            }

            next();
        } catch (error) {
            console.error("Security Protection Error:", error);
            res.status(500).json({ message: "Security check failed." });
        }
    };
};