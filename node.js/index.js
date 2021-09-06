require('dotenv').config();
const express = require('express');


// 路由定義開始
const app = express();
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.send(`<h2>Hello</h2>`)
});
//只能透過get方法訪問路由

// 路由結束
app.use((req, res) => {
    res.status(404).send(`<h2>888888</h2>`)
});

let port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`啟動: ${port}`, new Date());
});