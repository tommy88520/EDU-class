require('dotenv').config();
const express = require('express');


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