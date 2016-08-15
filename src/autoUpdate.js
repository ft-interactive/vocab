/**
 * Handles auto-updating
 */

const electron = require('electron');
const os = require('os');
const isDev = require('electron-is-dev');

const autoUpdater = electron.autoUpdater;
const platform = `${os.platform()}_${os.arch()}`;
const version = electron.app.getVersion();


function runAutoUpdate(mainWindow) {
  mainWindow.webContents.on('did-finish-load', () => {
    if (!isDev) {
      try {
        autoUpdater.setFeedURL(`https://ft-ig-examplestarter-updates.herokuapp.com/update/${platform}/${version}`);
      } catch (e) {
        console.error(e);
      }

      autoUpdater.on('checking-for-update', () => {
        mainWindow.webContents.send('checking-for-update');
      });

      autoUpdater.on('update-downloaded', () => {
        mainWindow.webContents.send('new-release');
      });

      autoUpdater.on('update-not-available', () => {
        mainWindow.webContents.send('no-update');
      });
    } else {
      console.info('in dev mode, simulating update...');
      mainWindow.webContents.send('running-updater');
      setTimeout(() => {
        mainWindow.webContents.send('no-update');
      }, 5000);
    }
  });

  mainWindow.webContents.on('update-app', () => {
    autoUpdater.quitAndInstall();
  });
}

module.exports = runAutoUpdate;
