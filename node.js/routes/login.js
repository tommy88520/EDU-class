const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./../modules/connect-mysql');
const upload = require('./../modules/upload-images');

const { getListData } = require('./address-book');

const router = express.Router();

// 登入
router.get('/login', (req, res)=>{
    res.locals.pageName = 'login';
    res.render('login');
});
router.post('/login', async (req, res)=>{

    // TODO: 欄位檢查

    const [rs] = await db.query("SELECT * FROM members WHERE `email`=?", [req.body.email]);

    if(!rs.length){
        // 帳號錯誤
        return res.json({success: false});
    }

    const success = await bcrypt.compare(req.body.password, rs[0].password);
    if(success){
        const {id, email, nickname} = rs[0];
        req.session.member = {id, email, nickname};
    }

    res.json({success});
});

// 註冊
router.get('/register', (req, res)=>{
    res.locals.pageName = 'register';
    res.render('register');
});
router.post('/register', async (req, res)=>{
    const output = {
        success: false,
        postData: req.body,
        error: ''
    };
    // TODO: 欄位檢查

    const hash = await bcrypt.hash(req.body.password, 10);

    const sql = "INSERT INTO `members`" +
        "(`email`, `password`, `mobile`, `birthday`, `nickname`, `create_at`)" +
        " VALUES (?, ?, ?, ?, ?, NOW())";

    let result;
    try {
        [result] = await db.query(sql, [
            req.body.email.toLowerCase().trim(),
            hash,
            req.body.mobile,
            req.body.birthday,
            req.body.nickname,
        ]);
        if(result.affectedRows===1){
            output.success = true;
        } else {
            output.error = '無法新增會員';
        }
    } catch(ex){
        console.log(ex);
        output.error = 'Email 已被使用過';
    }

    res.json(output);
});

router.get('/account-check', async (req, res)=>{
    const sql = "SELECT 1 FROM members WHERE `email`=?";
    const [rs] = await db.query(sql, [req.query.email ]);
    res.json({used: !!rs.length });
});

// 登出
router.get('/logout', (req, res)=>{
    delete req.session.member;
    res.redirect('/');
});


router.post('/login-jwt', async (req, res)=>{
    const output = {
        success: false,
        token: null,
    };
    // TODO: 欄位檢查

    const [rs] = await db.query("SELECT * FROM members WHERE `email`=?", [req.body.email]);

    if(!rs.length){
        // 帳號錯誤
        return res.json(output);
    }

    const success = await bcrypt.compare(req.body.password, rs[0].password);
    if(success){
        const {id, email, nickname} = rs[0];
        // req.session.member = {id, email, nickname};

        output.success = true;
        output.member = {id, email, nickname};
        output.token = await jwt.sign({id, email, nickname}, process.env.JWT_SECRET);
    }
    res.json(output);
});

router.get('/get-data-jwt',async (req, res)=>{
    const output = {
        success: false,
        data: null
    }

    // 判斷有沒有通過 jwt 驗證
    if(req.myAuth && req.myAuth.id){
        output.member = req.myAuth;
        output.success = true;
        output.data = await getListData(req, res);
    } else {
        output.error = '沒有 token 或者 token 不合法';
    }

    res.json(output);
});
module.exports = router;