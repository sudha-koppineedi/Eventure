const nodemailer = require("nodemailer");

/*
================================
CREATE EMAIL TRANSPORTER
================================
*/

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/*
================================
SEND PASSWORD RESET EMAIL
================================
*/

exports.sendPasswordResetEmail = async (options) => {

  try {

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      text: `${options.message}\n\nReset URL: ${options.resetUrl}`,
      html: `
      <div style="background:#f4f4f7;padding:40px 0;font-family:Segoe UI,Arial">

        <table style="max-width:600px;margin:auto;background:white;border-radius:10px">

          <tr>
            <td style="background:#3b82f6;padding:25px;text-align:center;color:white">
              <h1 style="margin:0">Eventure</h1>
              <p>Password Reset</p>
            </td>
          </tr>

          <tr>
            <td style="padding:30px">

              <p>${options.message}</p>

              <div style="text-align:center;margin:30px 0">

                <a href="${options.resetUrl}"
                  style="background:#3b82f6;color:white;padding:12px 22px;
                  text-decoration:none;border-radius:6px">

                  Reset Password

                </a>

              </div>

              <p style="font-size:13px;color:#777">
              If you didn't request this email you can ignore it.
              </p>

            </td>
          </tr>

          <tr>
            <td style="background:#f1f5f9;padding:15px;text-align:center;font-size:12px">
              Eventure • College Event Management Platform
            </td>
          </tr>

        </table>

      </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    return info;

  } catch (error) {

    console.error("Email sending error:", error);
    throw new Error("Failed to send password reset email");

  }

};