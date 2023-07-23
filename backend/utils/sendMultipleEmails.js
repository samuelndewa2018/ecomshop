const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  service: process.env.SMPT_SERVICE,
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
});

// Function to send email
const sendEmail = (recipientEmail, subject, message) => {
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Example usage
const recipients = ["recipient1@example.com", "recipient2@example.com"];
const subject = "Test Email";
const message = "Hello, this is a test email sent using Nodemailer!";

recipients.forEach((recipientEmail) => {
  sendEmail(recipientEmail, subject, message);
});
