//Using Event Emitter class
var EventEmitter = require('events').EventEmitter;

var getResource = function(number){

    var e = new EventEmitter();
    process.nextTick(function(){
        var count = 0;
        e.emit('start');
        var t = setInterval(function(){
            e.emit('output',count);
            count++;
            if(count==number){
                clearInterval(t);
                e.emit('end');
            }
        },500);




    })

    return e;
}


var e = getResource(3);

e.on('start',function(){
    console.log('** Start Event');
});

e.on('output',function(i){
    console.log('** Generating output '+i);
});


