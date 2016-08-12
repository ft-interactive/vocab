/**
 * These creates all the windows
 */

const { BrowserWindow } = require('electron');

function createMainWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
  });

  win.loadURL(`file://${__dirname}/../renderer/index/index.html`);

  return win;
}

function createOptionsWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
  });

  win.loadURL(`file://${__dirname}/../renderer/options/options.html`);

  return win;
}

function createNewProjectWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 450,
    frame: false,
  });

  win.loadURL(`file://${__dirname}/../renderer/example-list/example-list.html`);

  return win;
}

module.exports = {
  createNewProjectWindow,
  createOptionsWindow,
  createMainWindow,
};
