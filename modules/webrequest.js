var http = require('http');

var req = http.request('',function(response){

    console.log(response.statusCode);
response.pipe(process.stdout);
});

req.end();