const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

let transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  service: "Gmail", // 使用了內建傳輸傳送郵件 檢視支援列表：https://nodemailer.com/smtp/well-known/
  //   
  port: 465, // SMTP 埠
  secureConnection: true, // 使用了 SSL
  auth: {
    user: "tommy8852024@gmail.com",
    pass: "xynspjrbsonsziic", //授權碼，並非QQ密碼
  },
});
let veer = Math.random().toString().substr(2, 4);
let mailOptions = {
  from: '"tommy" <tommy8852024@gmail.com', // 傳送地址
  to: "matthew6303@gmail.com", // 接收列表（可多個）
  subject: "Hello,this is alan from China!", // 主題
  // 傳送text或者html格式（任選一個）
  
  text: `哈${veer}樓`, // plain text body
//   html:  fs.createReadStream(path.resolve(__dirname,'../public/a.html'))
//   html: '<img src="cid:01">', 
//   attachments: [                 //新增附件（可多個）
//     {
//       filename: "image",
//       path: path.resolve(__dirname, "2.jpg"),
//       cid: "01",//與上面的圖片cid對應
//     },
//     {
//       filename: "a.txt",
//       content: "hello world!",
//     },
//     {
//       filename: "b.txt",
//       path: "./text.txt",//根目錄新建即可
//     },
//   ],
};

// 傳送郵件
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log(info);
});