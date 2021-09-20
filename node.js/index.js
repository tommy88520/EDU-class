require('dotenv').config();

const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const MysqlStore = require('express-mysql-session')(session);
const moment = require('moment-timezone');
const upload = multer({dest: 'tmp_uploads/'});
// const uploadimg = require('modules/upload-images.js');
const uploadImg = require('./modules/upload-images');
const db = require('./modules/connect-mysql');
const sessionStore = new MysqlStore({}, db);


const app = express();
app.set('view engine', 'ejs')

app.use(session({
    name: 'MysessioniD',
    // 新用戶沒有使用到 session 物件時不會建立 session 和發送 cookie 
    saveUninitialized: false,
    resave: false, // 沒變更內容是否強制回存
    secret: 'vlmflmkvmlfmvmfl',
    store: sessionStore,
    cookie: {
    maxAge: 1200000, // 20分鐘，單位毫秒
    } 
}));

const corsOptions = {
    credentials: true,
    origin: (origin, cb)=>{
        // console.log(`origin: ${origin}`);
        cb(null, true);
    }
};
app.use( cors(corsOptions) );
//  app.use( cors() );

app.use(express.urlencoded({extended: false})); //設定true使用qs套件 ，false使用queryString
app.use(express.json());
//app.set('views', __dirname + '/../views'); 如果資料夾不是views要給路徑
app.use(express.static('public'))
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

//自訂的middleware
app.use(async (req, res, next)=>{
    res.locals.title = 'Jake的網站';
    res.locals.pageName = '';
    res.locals.keyword = '';


     // 設定 template 的 helper functions
     res.locals.dateToDateString = d => moment(d).format('YYYY-MM-DD');
     res.locals.dateToDateTimeString = d => moment(d).format('YYYY-MM-DD HH:mm:ss');

     res.locals.session = req.session; //把session資料傳到ejs

     // jwt 驗證
    req.myAuth = null;  // 自訂的屬性 myAuth
    const auth = req.get('Authorization');
    if(auth && auth.indexOf('Bearer ')===0){
        const token = auth.slice(7);
        try{
            req.myAuth = await jwt.verify(token, process.env.JWT_SECRET);
            console.log('req.myAuth:', req.myAuth);
        } catch(ex) {
            console.log('jwt-ex:', ex);
        }
    }
    next();
})

// 路由定義開始
app.get('/', (req, res) => {
    // res.send(`<h2>Hello</h2>`)
    res.locals.title = '首頁 - ' + res.locals.title;
    res.render('home', {name:'Tommy'})
});

app.get('/json-sales', (req, res)=>{
    res.locals.pageName = 'json-sales';
    const sales = require('./data/sales');
    res.render('json-sales', {sales});

});

app.get('/try-qs', (req, res)=>{
    // const sales = require('./data/sales');

    res.json(req.query);

});


//middleware
app.post('/try-post', (req, res)=>{
    // const sales = require('./data/sales');
    res.json(req.body);

});

app.get('/try-post-form', (req, res)=>{
    // const sales = require('./data/sales');
    res.render('try-post-form');

});

app.post('/try-post-form', (req, res)=>{
    // const sales = require('./data/sales');
    res.render('try-post-form', req.body);

});
app.get('/pending', (req, res)=>{

});

app.post('/try-upload', upload.single('avatar'), async (req, res)=>{
    if(req.file && req.file.mimetype=== 'image/png' ){
        try {
            await fs.rename(req.file.path, __dirname + '/public/img/' + req.file.originalname);
            return res.json({success: true, filename: req.file.originalname});
        } catch(ex){
            return res.json({success: false, error: '無法存檔', ex});
        }

    } else {
        await fs.unlink(req.file.path);  // 刪除暫存檔
        res.json({success: false, error: '格式不對'});
    }
});

app.post('/try-upload2', uploadImg.single('avatar'), async (req, res)=>{
    res.json(req.file);
});

app.post('/try-upload3', uploadImg.array('photo',12), async (req, res)=>{
    res.json(req.files);
});

// params 傳統的做法比較會用
app.get('/my-params1/:action/:id', (req, res)=>{
    res.json(req.params);
});
//下面這個更有彈性
app.get('/my-params2/:action?/:(\\d+)?', (req, res)=>{ res.json(req.params);
    //第一個\是為了跳脫
    res.json(req.params);
});
app.get(/^\/09\d{2}\-?\d{3}\-?\d{3}$/i, (req, res)=>{ res.json(req.params);
    //第一個\是為了跳脫
    let u = req.url.split('?')[0];
    u = u.slice(3); 
    u = u.split('-').join('');

    res.json({
        url: req.url,
        mobile: u
    });
});
const admin2Router = require('./routes/admin2'); 
app.use(admin2Router);
app.use('/', require('./routes/login'));
app.use('/', require('./routes/email'));


app.use('/admin3',require('./routes/admin3'));
app.use('/address-book', require('./routes/address-book'));

app.get('/try-sess', (req, res)=>{
req.session.my_var = req.session.my_var || 0; // 預設為 0 
req.session.my_var++;
res.json({
my_var: req.session.my_var,
session: req.session });
});

app.get('/try-moment', (req, res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';

    res.json({
        m1: moment().format(fm),
        m2: moment().tz('Europe/Berlin').format(fm),
        m3: moment().tz('Asia/Tokyo').format(fm),
    });
});

app.get('/try-db', async (req, res)=>{
    const [r] = await db.query("SELECT * FROM address_book WHERE `name` LIKE ?", ['%新%']);

    res.json(r);

});

//只能透過get方法訪問路由
// 路由結束
app.use((req, res) => {
    res.status(404).send(`<h2>888888</h2>`)
});

let port = process.env.PORT;
const node_env = process.env.NODE_ENV ||'development';
app.listen(port, ()=>{
    console.log(node_env);
    console.log(`啟動: ${port}`, new Date());
});