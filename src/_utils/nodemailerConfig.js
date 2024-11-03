const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: process.env.REACT_APP_NODEMAILER_EMAIL_ID,
      pass: process.env.REACT_APP_NODEMAILER_PASSWORD
  }
});

module.exports = transporter;