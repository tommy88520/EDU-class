require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const upload = multer({dest: 'tmp_uploads/'});
// const uploadimg = require('modules/upload-images.js');
const uploadImg = require('./modules/upload-images');



const app = express();
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false})); //設定true使用qs套件 ，false使用queryString
app.use(express.json());
//app.set('views', __dirname + '/../views'); 如果資料夾不是views要給路徑
app.use(express.static('public'))
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));


// 路由定義開始
app.get('/', (req, res) => {
    // res.send(`<h2>Hello</h2>`)
    res.render('home', {name:'Tommy'})
});

app.get('/json-sales', (req, res)=>{
    const sales = require('./data/sales');

    // console.log(sales);
    // res.json(sales);
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