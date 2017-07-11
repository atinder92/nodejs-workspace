var http = require('http');

var port = 8081;
var ip = "localhost";

http.createServer(function(req,res){

    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("Hello World! Welcome to Node Js");


}).listen(port,ip);
console.log("Server running");
