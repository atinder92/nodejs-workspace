var os = require('os');
console.log('Welcome to NodeJs');

function toMb(bytes){
    return (Math.round((bytes/1024/1024)*100)/100);
}

console.log(os.hostname());
console.log(toMb(os.freemem())+" Mb");
console.log(toMb(os.totalmem())+" Mb");