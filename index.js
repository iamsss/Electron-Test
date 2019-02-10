console.log("From Index .js");
const electron = require("electron");
const ipc = electron.ipcRenderer;

const asyncBtn = document.getElementById("asyncBtn");

asyncBtn.addEventListener('click', function(event){

    console.log("I AM Clicked");
    ipc.send('async-message');
    
  console.log('Async Message 2');
});

ipc.on('async-reply', function(event, arg){
    console.log(arg);
});