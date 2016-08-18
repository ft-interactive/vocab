/**
 * This is the JavaScript responsible for the main window, and contains three parts:
 *  - Dropzone config
 *  - Git repo updater event messages
 *  - Squirrel auto-updater messages
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

// visual-vocabulary repo updater messages
ipcRenderer.on('repo-message', (e, message) => {
  document.getElementById('messages').textContent = message;

  // Make disappear after ten seconds.
  setTimeout(() => {
    document.getElementById('messages').textContent = '';
  }, 10000);
});

// Squirrel auto-updater events
ipcRenderer.on('running-updater', () => {
  const updates = document.getElementById('updates');
  const icon = document.createElement('span');

  icon.classList.add('icon', 'icon-hourglass', 'blink');
  icon.setAttribute('title', 'Checking for updates...');
  updates.appendChild(icon);

  ipcRenderer.on('new-release', () => {
    icon.classList.remove('icon-hourglass', 'blink');
    icon.classList.add('icon-up-circled', 'new-update');
    icon.setAttribute('New update available — click to update');
    icon.addEventListener('click', () => {
      ipcRenderer.send('update-app');
    });
  });

  ipcRenderer.on('no-update', () => {
    icon.classList.remove('icon-hourglass', 'blink');
    icon.classList.add('icon-check', 'no-update');
    icon.setAttribute('title', 'You have the latest version');
  });
});
