// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, dimWindow, colorWindow, framelessWindow;

let parentWindow, childWindow;

function createWindow () {
  // win = new BrowserWindow(); // Deafault Wnodow
  // dimWindow = new BrowserWindow({
  //   width:400,
  //   height:400,
  //   maxHeight: 600,
  //   maxWidth: 600
  // }); // Dimenson Wndow
  // colorWindow = new BrowserWindow({
  //   backgroundColor: '#228b22'
  // }) // ColorWindow

  // framelessWindow = new BrowserWindow({
  //   backgroundColor: '#800000' , frame: false
  // })
 
  parentWindow = new BrowserWindow({
    title: 'Parent'
  });
  // childWindow = new BrowserWindow({
  //   parent: parentWindow,
  //   modal: true,
  //   title: 'Child'
  // }) // Note Parent Window never come infront of child window 

  // childWindow.loadURL('https://google.com'); // child window open and than url get loaded

  childWindow = new BrowserWindow({
    show: false, // not show by default
    parent: parentWindow,
    modal: true,
    title: 'Child'
  })
  childWindow.loadURL('https://google.com');
  childWindow.once('ready-to-show', () => {
    childWindow.show()
  }) // Now child window will show after rendering the google.com and than show
}

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
