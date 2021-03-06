var http = require('http');
var fs   = require('fs');
var socketio   = require('socket.io');

//configuration
var PORT = 8085;
var IP   = "localhost";

//server setup
var server = http.createServer(function(req,res){

    fs.readFile(__dirname+"/socketwelcome.html",function(err,data){

        if(err){
            res.writeHead(500);
            return res.end('Error loading socketwelcome.html');
        }else{
            res.writeHead(200);
            res.end(data);
        }




    });



}).listen(PORT,IP);
console.log("** Server started");

//socket io configuration
var io = socketio.listen(server);

io.on('connection',function(socket){

        console.log('** Socket started');

        var count = 0;
        setInterval(function(){

            socket.emit('time',count);
            count++;

        },1000);

        socket.on('message',function(message){
            console.log("** Got Data "+message);

        });




});

