const Joi = require('joi');

(async ()=>{
    const schema = Joi.object({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
        .min(5)
        .max(10)
        .required()
    });
    try {
        const test = await schema.validate(req.body.email,schema,(err,result) => {
            if (ex) {
                console.log('ex');
                output.error = '無法驗證';
            }
                output.success = true,
                console.log('result');
    
        })
    } catch(ex) {
        console.log(ex);
        output.error = 'Email 已被過';
    }
    

schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { 
//     console_log('joi-err:', err)
// }
})()