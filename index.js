console.log("From Index .js");

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const btn = document.getElementById('btnOpen');
btn.addEventListener('click',function(event){

    let winthree = new BrowserWindow();
    winthree.loadURL(url.format({
        pathname: path.join(__dirname, 'one.html'),
        protocol: 'file',
        slashes : true
      }));
});