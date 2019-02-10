console.log("From Index .js");
const electron = require("electron");
const ipc = electron.ipcRenderer;

const asyncBtn = document.getElementById("asyncBtn");
const syncBtn = document.getElementById("syncBtn");

asyncBtn.addEventListener('click', function(event){

    console.log("I AM Clicked");
    ipc.send('async-message');
    
  console.log('Async Message 2');
});

syncBtn.addEventListener('click', function(event){

    console.log("sync 1"); 
    const reply = ipc.sendSync('sync-message');
    console.log(reply);
    
  console.log('sync 2');
});

ipc.on('async-reply', function(event, arg){
    console.log(arg);
});