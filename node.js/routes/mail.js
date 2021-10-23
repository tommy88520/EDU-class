const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

// const auth = {
//     auth: {
//         api_key: process.env.API_KEY ||  'MAIL_GUN_API_KEY', // TODO: Replace with your mailgun API KEY
//         domain: process.env.DOMAIN || 'MAIL_GUN_DOMAIN' // TODO: Replace with your mailgun DOMAIN
//     }
// };

// const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email, subject, text, cb) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'tommy8852024@gmail.com', // generated ethereal user
            pass: 'xynspjrbsonsziic'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });
    const mailOptions = {
        from: 'tommy8852024@gmail.com', // TODO replace this with your own email
        to: email, // TODO: the receiver email has to be authorized for the free tier
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;