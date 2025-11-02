export function createWelcomeEmailTemplate(name, clientURL) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to TallTalk</title>
  </head>
  <body style="font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f9f8; color: #222; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">

      <div style="background: linear-gradient(135deg, #b2f012, #70e000); text-align: center; padding: 35px 20px;">
        <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="TallTalk Logo" style="width: 80px; height: 80px; margin-bottom: 15px; border-radius: 50%; background: white; padding: 10px;">
        <h1 style="color: #111; font-size: 28px; font-weight: 600; margin: 0;">Welcome to <span style="color:#2d6a4f;">TallTalk</span>!</h1>
      </div>

      <div style="padding: 35px;">
        <p style="font-size: 18px; color: #2d6a4f; margin: 0 0 20px 0;"><strong>Hey ${name},</strong></p>
        <p style="margin-bottom: 20px;">We’re thrilled to have you join <strong>TallTalk</strong> — a space built for genuine conversations and effortless connections.</p>

        <div style="background-color: #f2fdf2; padding: 25px; border-radius: 12px; border-left: 5px solid #70e000; margin: 25px 0;">
          <p style="font-size: 16px; font-weight: 600; margin-bottom: 15px;">Here’s how to get started:</p>
          <ul style="padding-left: 20px; margin: 0; color: #333;">
            <li style="margin-bottom: 8px;">Customize your profile</li>
            <li style="margin-bottom: 8px;">Find friends and start chatting</li>
            <li style="margin-bottom: 8px;">Join a group or create your own</li>
            <li>Share your thoughts, photos, and moments</li>
          </ul>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${clientURL}" style="background: linear-gradient(135deg, #b2f012, #70e000); color: #111; text-decoration: none; padding: 14px 36px; border-radius: 50px; font-weight: 600; letter-spacing: 0.3px; display: inline-block; box-shadow: 0 4px 12px rgba(112,224,0,0.4);">
            Open TallTalk
          </a>
        </div>

        <p style="margin-bottom: 10px;">Need help getting started? We’ve got you covered — our team is always here to assist.</p>
        <p style="margin-top: 0;">Welcome aboard, and happy chatting!</p>

        <p style="margin-top: 30px; margin-bottom: 0;">Cheers,<br><strong>The TallTalk Team</strong></p>
      </div>

      <div style="text-align: center; padding: 20px; background-color: #fafafa; color: #888; font-size: 12px;">
        <p>© 2025 TallTalk. All rights reserved.</p>
        <p>
          <a href="#" style="color: #70e000; text-decoration: none; margin: 0 8px;">Privacy</a> |
          <a href="#" style="color: #70e000; text-decoration: none; margin: 0 8px;">Terms</a> |
          <a href="#" style="color: #70e000; text-decoration: none; margin: 0 8px;">Support</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
}