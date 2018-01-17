/**
 * Handles auto-updating
 */

import { autoUpdater, app } from 'electron';
import { platform as platformShort, arch } from 'os';

const platform = `${platformShort()}_${arch()}`;
const version = app.getVersion();

export default function runAutoUpdate(mainWindow) {
  mainWindow.webContents.on('did-finish-load', () => {
    if (process.env.NODE_ENV === 'production') {
      try {
        autoUpdater.setFeedURL(
          `https://ft-ig-vocab-updates.herokuapp.com/update/${platform}/${version}`
        );
      } catch (e) {
        console.error(e);
      }

      autoUpdater.on('checking-for-update', () => {
        if (mainWindow.webContents) mainWindow.webContents.send('checking-for-update');
      });

      autoUpdater.on('update-downloaded', () => {
        if (mainWindow.webContents) mainWindow.webContents.send('new-release');
      });

      autoUpdater.on('update-not-available', () => {
        if (mainWindow.webContents) mainWindow.webContents.send('no-update');
      });
    } else if (mainWindow) {
      console.info('in dev mode, simulating update...');
      mainWindow.webContents.send('running-updater');

      const t = setTimeout(() => {
        mainWindow.webContents.send('no-update');
      }, 5000);

      mainWindow.webContents.on('close', () => clearTimeout(t));
    }
  });

  mainWindow.webContents.on('update-app', () => {
    autoUpdater.quitAndInstall();
  });
}

module.exports = runAutoUpdate;
