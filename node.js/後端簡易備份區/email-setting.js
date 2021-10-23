require('dotenv').config();
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

process.env.JWT_SECRET
const sendMail = (email, subject, output, cb) => {

    
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'tommy8852024@gmail.com', // generated ethereal user
            pass: process.env.EMAIL_SECRET // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });
    const mailOptions = {
        from: 'tommy8852024@gmail.com', // TODO replace this with your own email
        to: email, // TODO: the receiver email has to be authorized for the free tier
        subject,
        html:output,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;