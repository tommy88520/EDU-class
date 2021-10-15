const express = require('express');
const db = require('./../modules/connect-mysql');
const upload = require('./../modules/upload-images');

const router = express.Router();

async function getListData(req, res){
    const perPage = 5;
    let page = parseInt(req.query.page) || 1;
    let keyword = req.query.keyword || '';
    keyword = keyword.trim(); // 去掉頭尾的空白

    //res.locals.keyword = keyword; // 傳給 template

    const output = {

    };

    let where = " WHERE 1 ";
    if(keyword){
        output.keyword = keyword;
        where += ` AND \`name\` LIKE ${ db.escape('%' + keyword + '%') } `;
    }


    const t_sql = `SELECT COUNT(1) totalRows FROM address_book ${where}`;
    const [[{totalRows}]] = await db.query(t_sql);
    // 陣列裡的第一個項目，裡面的totalRaws
    output.totalRows = totalRows;
    // 總比數
    output.totalPages = Math.ceil(totalRows/perPage);
    // 總頁數
    output.perPage = perPage;
    output.rows = [];
    output.page = page;

    // 如果有資料才去取得分頁的資料
    if(totalRows > 0){
        if(page < 1){
            output.redirect = '?page=1';
            return output;
        }
        if(page > output.totalPages){
            output.redirect = '?page=' + output.totalPages;
            return output;
        }

        const sql = `SELECT * FROM \`address_book\` ${where} ORDER BY sid DESC LIMIT ${(page-1)*perPage}, ${perPage}`;
        const [rows] = await db.query(sql)
        output.rows = rows;

    }
    return output;
}

router.getListData = getListData; // 將 function 掛在 router 物件上做匯出

router.get('/', (req, res)=>{
    res.render('address-book/main');
    // ejs的檔案路徑
});

router.get('/list', async (req, res)=>{
    res.locals.pageName = 'ab-list';

    const output = await getListData(req, res);
    if(output.redirect){
        return res.redirect(output.redirect)
    }
    res.render('address-book/list', output);
});

router.get('/api/list', async (req, res)=>{
    const output = await getListData(req, res);
    res.json(output);
});


router.delete('/delete/:sid([0-9]+)', async (req, res)=>{
    const sql = "DELETE FROM address_book WHERE sid=?";

    const [r] = await db.query(sql, [req.params.sid]);
    console.log({r});
    res.json(r);
});

router.route('/add')
    .get(async (req, res)=>{
        res.locals.pageName = 'ab-add';
        res.render('address-book/add');
    })
    .post(async (req, res)=>{
        // TODO: 欄位檢查
        const output = {
            success: false,
        }

        // const sql = "INSERT INTO `address_book`(" +
        //     "`name`, `email`, `mobile`, `birthday`, `address`, `created_at`) VALUES (?, ?, ?, ?, ?, NOW())";
        //
        // const [result] = await db.query(sql, [
        //     req.body.name,
        //     req.body.email,
        //     req.body.mobile,
        //     req.body.birthday,
        //     req.body.address,
        // ]);

        const input = {...req.body, created_at: new Date()};
        const sql = "INSERT INTO `address_book` SET ?";
        let result = {};
        // 處理新增資料時可能的錯誤
        try {
            [result] = await db.query(sql, [input]);
        } catch(ex){
            output.error = ex.toString();
        }
        output.result = result;
        if(result.affectedRows && result.insertId){
            output.success = true;
        }

        console.log({result});
        /*
        {
          result: ResultSetHeader {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 148,
            info: '',
            serverStatus: 2,
            warningStatus: 0
          }
        }
         */

        res.json(output);
    });


router.route('/edit/:sid')
    .get(async (req, res)=>{
        const sql = "SELECT * FROM address_book WHERE sid=?";
        const [rs] = await db.query(sql, [req.params.sid]);

        if(rs.length){
            res.render('address-book/edit', {row: rs[0]});
        } else {
            res.redirect('/address-book/list');
        }
    })
    .post(async (req, res)=>{
        // TODO: 欄位檢查
        const output = {
            success: false,
            postData: req.body,
        }

        const input = {...req.body};
        const sql = "UPDATE `address_book` SET ? WHERE sid=?";
        let result = {};
        // 處理修改資料時可能的錯誤
        try {
            [result] = await db.query(sql, [input, req.params.sid]);
        } catch(ex){
            output.error = ex.toString();
        }
        output.result = result;
        if(result.affectedRows===1){
            if(result.changedRows===1){
                output.success = true;
            } else {
                output.error = '資料沒有變更';
            }
        }

        res.json(output);
    });


module.exports = router;