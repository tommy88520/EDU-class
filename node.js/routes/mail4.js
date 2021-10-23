require('dotenv').config();

const express = require('express');

const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

let PORT = 3004


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

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'tommy8852024@gmail.com', // sender address
      to: 'tommy8852024@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
    //   html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('got it');   

  });

  let port = process.env.PORT;
  const node_env = process.env.NODE_ENV ||'development';
  app.listen(port, ()=>{
      console.log(node_env);
      console.log(`啟動: ${port}`, new Date());
  });
