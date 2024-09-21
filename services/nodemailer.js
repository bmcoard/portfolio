require("dotenv").config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bmcoard@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});


async function sendEmail(recipient, subject, body) {
  
  const mailOptions= {
    from: '"Brian Coard" bmcoard@gmail.com', // sender address
    to: recipient, // list of receivers
    subject: subject, // Subject line
    text: "Hello world?", // plain text body
  };

  console.log("Sending: ", mailOptions)
  const info = await transporter.sendMail(mailOptions)
  console.log("Sent: ", info)


  return info
}

module.exports = {sendEmail}