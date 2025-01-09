var fs = require('fs');

fs.writeFileSync('./test.text','Hello world');

const result =fs.readFileSync('./test.text','utf-8');
console.log(result);
