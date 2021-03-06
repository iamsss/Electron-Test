// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const electron = require("electron");
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;

const dailog = electron.dialog;

const Menu = electron.Menu;
const MenuItem = electron.MenuItem;



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

  win.on('closed',() => 
  {
    win = null;
  })



}

ipc.on('async-message',function(event){
  event.sender.send('async-reply','Main Process Open Error Dailog');
});

ipc.on('sync-message', function(event){
  event.returnValue = 'sync-reply';
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  
  win = new BrowserWindow();
  createWindow();
  const template = [
    {
      label: 'Edit',
      submenu : [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'demo',
      submenu: [
        {
          label : 'submenu1',
          click: function(){
            console.log("Clicked Submenu 1");
          }
        },
        {
          type: 'separator'
        },
        {
          label : 'submenu2',
          click: function(){
            console.log("Clicked Submenu 2");
          }
        }
      ]
    }
    ,{
      label:'Help',
      submenu:[{
        label: 'About Electron',
        click: function() {
          electron.shell.openExternal('http://www.google.com');
        },
        accelerator :'CmdOrCtrl + Shift + H'

      }]
    }
  ]
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const ctxMenu = new Menu()
  ctxMenu.append(new MenuItem({
    label:'Hello',
    click: function(){
      console.log('Context Menu Item Clicked');
    }
  }))
  ctxMenu.append(new MenuItem({role: 'selectall'}))
  win.webContents.on('context-menu',function(e,params){
    ctxMenu.popup(win, params.x , params.y)
  })

})

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
