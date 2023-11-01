const nodemailer = require("nodemailer");
const templates = require("./../views/emails");

const transporter = nodemailer.createTransport({
  host: process.env.MAILING_SERVICE_HOST,
  port: process.env.MAILING_SERVICE_PORT,
  auth: {
    user: process.env.MAILING_SERVICE_USER,
    pass: process.env.MAILING_SERVICE_USER_PASSWORD,
  },
});

class Mailer {
  static async sendMail({ from, to, subject, text, html }) {
    return await new Promise((resolve, reject) => {
      transporter.sendMail({ from, to, subject, text, html }, (err, info) => {
        if (err) {
          reject(err);
        }
        resolve(info);
      });
    });
  }

  static async sendTestMail() {
    return await Mailer.sendMail({
      from: process.env.MAILING_SERVICE_USER,
      to: "test@gmail.com",
      subject: "Test Handlebars",
      html: templates.test({
        message: "This is a test message from JS",
      }),
    });
  }

  static async sendVerificationEmail({ email, verificationToken }) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    return await Mailer.sendMail({
      from: process.env.MAILING_SERVICE_USER,
      to: email,
      subject: "Verify your email for Festify",
      html: templates.emailVerification({
        verificationUrl,
      }),
    });
  }

  static async sendForgotPasswordMail({ to, redirectUrl, user, organisation }) {
    return await Mailer.sendMail({
      from: process.env.MAILING_SERVICE_USER,
      to,
      subject: "Festify Password Reset",
      html: templates.forgotPassword({
        redirectUrl,
        user,
        organisation,
      }),
    });
  }
}

module.exports = Mailer;
