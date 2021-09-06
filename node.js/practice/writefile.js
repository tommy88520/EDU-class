const fs = require('fs');

const data = {
    name: 'David',
    age: 28,
    lengh: 14,
};

fs.writeFile(
    './practice/data.json', //路徑
    JSON.stringify(data, null, 4),
    error=>{
        if(error){
            console.log('無法寫入檔案:', error);
            process.exit(); // 結束程式
        }
        console.log('寫入成功');
    });