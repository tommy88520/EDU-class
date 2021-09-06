
const {f1,f3} = require('./arrow_function');
const f2 = require(__dirname + '/arrow_function');

console.log('2:', __dirname );
console.log(f1(9));
console.log(f3(10));

console.log(f2.f1(5));
console.log(f2.f3(5));







