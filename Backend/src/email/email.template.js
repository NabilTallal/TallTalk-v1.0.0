export function createWelcomeEmailTemplate(name, clientURL) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to TallTalk</title>
</head>

<body style="margin:0; padding:0; font-family:'Segoe UI','Inter','Helvetica Neue',Arial,sans-serif; -webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:50px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111; border-radius:18px; overflow:hidden; border:1px solid rgba(132,255,100,0.15); box-shadow:0 0 40px rgba(132,255,100,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:45px 20px; background:linear-gradient(135deg,#84ff64,#38b000);">

              <img 
                src="https://i.ibb.co/p6qfRh2y/logo-png.png"
                width="90"
                height="90"
                alt="TallTalk Logo"
                style="display:block; margin-bottom:22px; border-radius:50%; background:#000000; padding:12px;"
              />

              <h1 style="margin:0; font-size:28px; font-weight:700; letter-spacing:-0.5px; color:#0b0b0b;">
                Welcome to TallTalk
              </h1>

              <p style="margin-top:10px; font-size:14px; font-weight:500; color:#1b4332; letter-spacing:0.3px;">
                Conversations that matter.
              </p>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:45px 38px; color:#e5e5e5;">

              <p style="font-size:19px; font-weight:600; margin:0 0 22px 0;">
                Hey <span style="color:#84ff64;">${name}</span>,
              </p>

              <p style="color:#cfcfcf; line-height:1.7; font-size:15px; margin-bottom:28px;">
                You’re officially in. TallTalk is built for real conversations - no noise, no clutter, just connection.
              </p>

              <!-- Feature Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:35px 0; background:#161616; border-radius:14px; border:1px solid rgba(132,255,100,0.2);">
                <tr>
                  <td style="padding:28px; color:#bbbbbb;">

                    <p style="color:#84ff64; font-weight:600; font-size:14px; letter-spacing:0.5px; margin-top:0; text-transform:uppercase;">
                      Start here
                    </p>

                    <ul style="padding-left:20px; margin:10px 0 0 0; line-height:1.8; font-size:14px;">
                      <li>Set up your profile</li>
                      <li>Send your first message</li>
                      <li>Create your own space</li>
                    </ul>

                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="text-align:center; margin:40px 0;">
                <a href="${clientURL}"
                   style="background:linear-gradient(135deg,#84ff64,#38b000);
                          color:#0b0b0b;
                          text-decoration:none;
                          padding:15px 42px;
                          border-radius:50px;
                          font-weight:700;
                          font-size:14px;
                          letter-spacing:0.6px;
                          display:inline-block;
                          box-shadow:0 6px 20px rgba(132,255,100,0.35);">
                  ENTER TALLTALK
                </a>
              </div>

              <p style="color:#9e9e9e; font-size:14px; line-height:1.7;">
                Need help? We’re here for you.
              </p>

              <p style="margin-top:35px; font-size:14px;">
                - The TallTalk Team
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:22px; background-color:#0f0f0f; color:#666; font-size:12px; border-top:1px solid rgba(132,255,100,0.08);">
              © 2026 TallTalk. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}