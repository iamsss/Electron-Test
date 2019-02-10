console.log("From Index .js");
const electron = require("electron");
const ipc = electron.ipcRenderer;

const errorBtn = document.getElementById("errorBtn");

errorBtn.addEventListener('click', function(event){

    console.log("I AM Clicked");
    ipc.send('open-error-dialog');
});

ipc.on('opened-error-dailog', function(event, arg){
    console.log(arg);
});