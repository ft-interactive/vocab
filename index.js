'use strict';
const electron = require('electron');
const autoUpdater = electron.autoUpdater;
const os = require('os');
const app = electron.app;
const Menu = electron.Menu;

const platform = os.platform() + '_' + os.arch();
const version = app.getVersion();

// autoUpdater.setFeedURL(`http://download.myapp.com/update/${platform}/${version}`);

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
let optionWindow;

function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 600,
    height: 400
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);

  return win;
}

function createOptionsWindow() {
  const win = new electron.BrowserWindow({
    width: 400,
    height: 300,
    frame: false
  });

  win.loadURL(`file://${__dirname}/options.html`);
  win.on('closed', () => {
    optionWindow = null;
  });

  return win;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  // Set up the menu
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload();
          }
        },
        {
          label: 'Preferences',
          accelerator: 'CmdOrCtrl+,',
          click (item, focusedWindow) {
            if (!optionWindow) {
              optionWindow = createOptionsWindow();
            }
          }
        },
        {
          role: 'quit'
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
  mainWindow = createMainWindow();
});
