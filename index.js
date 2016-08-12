/**
 * Main controller for Example Starter
 */

const electron = require('electron');
// const os = require('os');
const storage = require('electron-json-storage');
const buildExample = require('./base/buildExample');
const processFile = require('./base/processFile');
const manageExamplesRepo = require('./base/manageExamplesRepo');
const {
  createOptionsWindow,
  createMainWindow,
  createNewProjectWindow,
} = require('./base/createWindow');

const app = electron.app;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
// const autoUpdater = electron.autoUpdater;
//
// const platform = `${os.platform()}_${os.arch()}`;
// const version = app.getVersion();

// autoUpdater.setFeedURL(`http://download.myapp.com/update/${platform}/${version}`);

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// Prevent window being garbage collected
let mainWindow;
// These should probably be garbage collected...
let optionWindow;
let newProjectWindow;

function setupMenu() {
  // Set up the menu
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload();
          },
        },
        {
          label: 'Preferences',
          accelerator: 'CmdOrCtrl+,',
          click() {
            if (!optionWindow) {
              optionWindow = createOptionsWindow();
              optionWindow.on('closed', () => {
                optionWindow = null;
              });
            }
          },
        },
        {
          role: 'quit',
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);

  return menu;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }
});

app.on('ready', () => {
  setupMenu();
  mainWindow = createMainWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  storage.get('examplePath', (err, data) => {
    manageExamplesRepo(data, mainWindow);
  });
});

ipcMain.on('file-to-process', (evt, file) => {
  if (!newProjectWindow) {
    newProjectWindow = createNewProjectWindow();
    newProjectWindow.on('closed', () => {
      newProjectWindow = null;
    });
  }
  const { meta, processed, filePath } = processFile(file);
  newProjectWindow.webContents.on('did-finish-load', () => {
    // @TODO figure out why I need to do this here...
    console.dir(processed);
    // processed.shift();
    // processed.unshift(meta[0].slice());
    newProjectWindow.webContents.send('incoming-data', {
      metadata: meta,
      path: filePath,
      processed,
    });
  });
});

ipcMain.on('build-example', buildExample);
