//nodemailer.js
const express = require("express");
const nodemailer = require("nodemailer");
const db = require("../modules/connect-mysql");
const router = express.Router();

//建立一個smtp伺服器
const config = {
  service: "Gmail", // 使用了內建傳輸傳送郵件 檢視支援列表：https://nodemailer.com/smtp/well-known/
  //
  port: 465, // SMTP 埠
  secureConnection: true, // 使用了 SSL
  auth: {
    user: "tommy8852024@gmail.com",
    pass: "xynspjrbsonsziic", //授權碼，並非QQ密碼
  },
};
// 建立一個SMTP客戶端物件

//傳送郵件
function test(mail) {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("mail sent:", info.res);
  });
}

router.get("/email", async (req, res) => {
  res.locals.pageName = "email";
  res.render("email");
});

function createSixNum() {
  var Num = "";
  for (var i = 0; i < 6; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return Num;
}
router.post("/email", async (req, res) => {
  // let ver = Math.random().toString().substr(2, 4);

  var email = ""; //剛剛從前臺傳過來的郵箱
  var user_name = req.query.user_name; //剛剛從前臺傳過來使用者名稱
  var code = await createSixNum(); //這裡是我寫的生成的隨機六位數，等等下面給程式碼
  //var date = new Date();//獲取當前時間
  var isLive = "no";
  //去資料庫中找有沒有同名的使用者名稱，這裡就要自己寫了，不同的資料庫查詢方法不同
  const [result] = await db.query("SELECT * FROM members2 WHERE `email`=?", [
    req.body.email,
  ]);

  //console.log(result);

  //   let mailOptions = {
  //     from: '"tommy" <tommy8852024@gmail.com', // 傳送地址
  //     to: "matthew6303@gmail.com", // 接收列表（可多個）
  //     subject: "Hello,this is alan from China!", // 主題
  //     // 傳送text或者html格式（任選一個）

  //     text: `哈樓`,
  //   };

  if (result.length > 0) {
    req.body = { success: false, message: "賬號已經存在" };
  } else {
    req.body = { success: true, message: "賬號可行" }; //資料傳回前臺
    var mail = {
      // 發件人
      from: "tommy8852024@gmail.com",
      // 主題
      subject: "接受憑證", //郵箱主題
      // 收件人
      to: req.query.email, //前臺傳過來的郵箱
      // 郵件內容，HTML格式
      text: `用${code}作為你的驗證碼`, //傳送驗證碼
    };

    // var json = {user_name,email,code,date,isLive};

    const sql =
      "INSERT INTO `members2`" +
      "(`user_name`, `email`, `code`, `date`, `isLive`)" +
      " VALUES (?, ?, ?, NOW(),? )";

    let result;
    [result] = await db.query(sql, [
      req.body.user_name,
      req.body.email,
      req.body.code,
      req.body.isLive,
    ]);
    // await DB.insert('user',json);//將獲取到的驗證碼存進資料庫，待會提交時要檢查是不是一致
    console.log(email);
    test(mail); //傳送郵件
  }
});
// router.post('/email',async (req, res)=>{

//     //console.log(req.body);

//     var username = req.body.username;//獲取使用者名稱
//     var password = req.body.password;//獲取密碼
//     var code = req.body.code;//獲取你輸入的驗證碼

//     //去資料庫把剛剛在存驗證碼的時候一起存的那條記錄找出來
//     var result =await DB.find('user',{"user_name":username});

//     var nowDate = (new Date()).getTime();//獲取當前時間

//     // 判斷驗證碼是否正確，時間是否超過10分鐘
//     if(result[0].code===code && (result[0].date.getTime()) - nowDate <600000){
//         //更新資料庫的使用者資訊，把使用者密碼深的也存進去
//         await DB.update('user',{user_name:username},{
//             "password":password,
//             "status":1,
//             "isLive":"yes",//註冊成功啦
//             "add_time":getTime()
//         });

//     }else{
//         req.render('admin/error',{
//             //驗證碼過期或者是驗證碼錯誤，要寫點什麼的話自己再去寫寫吧。
//         })

//     }

// });
module.exports = router;
