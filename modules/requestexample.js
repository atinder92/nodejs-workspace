var request = require('request');

request("",function(error,response,body){
    if(!error && response.statusCode == 200){
        console.log(response.body);
    }

});