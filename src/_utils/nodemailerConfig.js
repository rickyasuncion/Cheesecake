const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: "Cheesecakemovies309@gmail.com",
      pass: "zfir vfxm aqlh cqcv"
  }
});

module.exports = transporter;