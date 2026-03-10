import { resendClient, sender } from "../utils/resend.util.js";
import { createWelcomeEmailTemplate } from "./email.template.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to TallTalk!",
        html: createWelcomeEmailTemplate(name, clientURL),
    });

    if (error) {
        console.error("Error sending welcome email : ", error);
        throw new Error("Failed to send the welcome email");
    }

    console.log("Welcome email sent successfully", data);
};
