/**
 * This is the JavaScript responsible for the main window, and contains
 * most of the front-end program logic.
 */

const Dropzone = require('dropzone');
const ipcRenderer = require('electron').ipcRenderer;

Dropzone.options.loadFile = {
  dictDefaultMessage: 'Drop .txt files here to start',
  acceptedFiles: '.txt,.tsv',
  init() {
    this.on('complete', file => {
      ipcRenderer.send('file-to-process', file.path);
    });
  },
};

ipcRenderer.on('repo-message', (e, message) => {
  document.getElementById('messages').textContent = message;

  // Make disappear after ten seconds.
  setTimeout(() => {
    document.getElementById('messages').textContent = '';
  }, 10000);
});
