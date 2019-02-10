// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const electron = require("electron");
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;

const dailog = electron.dialog;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {

 
  win = new BrowserWindow();

  win.loadURL(url.format({
    pathname: path.join(__dirname,'index.html'),
    protocol: 'file',
    slashes: true
  })
  );

  win.on('closed',() =>{
    win = null;
  })



}

ipc.on('open-error-dialog',function(event){
  dailog.showErrorBox('An Error Message','Demo of Error Dailog');
  event.sender.send('opened-error-dailog','Main Process Open Error Dailog');
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
