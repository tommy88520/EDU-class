const validation = await schema.validate(req.body);
    try {
        if(!validation.error){
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
        } else {
            throw new Error(validation.error.message)
        }
    }
    catch (err) {
        console.log(err);
        // return;
    }
    res.json({success: false, error: '格式不對'});