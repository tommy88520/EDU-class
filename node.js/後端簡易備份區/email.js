const express = require('express');
const sendMail = require('./email-setting');
const router = express.Router();
router.post('/email', (req, res) => {
    const { nickname, email,verification_code } = req.body;
    console.log('Data: ', req.body);
    const subject = 'here的驗證信'
    const output = `
    <h1>歡迎註冊
    <span style="color:#e88239">here<span/>
    </h1>
    <h3>請回到頁面上填入驗證碼</h3>
    <ul >  
      <li style="list-style-type: none;padding:0px;">
      親愛的 ${nickname}  您好
      </li>
      <li style="list-style-type: none;padding:0px;">
      您的驗證碼是 
      <span style="color:blue">${verification_code}
      <span/>
      </li>
    </ul>
  `;

    sendMail(email, subject,output, function(err, data) {
        if (err) {
            console.log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        console.log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});
module.exports = router;