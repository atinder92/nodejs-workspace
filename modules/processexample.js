// Using process in the NodeJs
process.stdin.on('data',function(data){

    console.log("Data-->"+data);
});


process.on('exit',function(data){
    console.log('** Exiting now');
});

console.log(`This processor architecture is ${process.arch}`);
