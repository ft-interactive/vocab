/**
 * Options dialog logic
 */


const storage = require('electron-json-storage');
const joinPath = require('path').join;
const HOME = require('os').homedir();

const pathEl = document.getElementById('example-path');
const editorEl = document.getElementById('preferred-editor');

document.getElementById('save').addEventListener('click', () => {
  storage.set('examplePath', { path: pathEl.value }, (err) => {
    if (err) throw err;
  });

  storage.set('preferredEditor', { editor: editorEl.value }, (err) => {
    if (err) throw err;
  });
});

document.getElementById('cancel').addEventListener('click', () => {
  const win = require('electron').remote.getCurrentWindow();

  win.close();
});

const EDITORS = new Map();
EDITORS.set('Sublime Text', 'subl');
EDITORS.set('Atom', 'atom');
EDITORS.set('Brackets', 'brackets');

EDITORS.forEach((value, key) => {
  const opt = document.createElement('option');
  opt.value = value;
  opt.innerHTML = key;
  editorEl.appendChild(opt);
});

storage.get('examplePath', (err, data) => {
  if (err) throw err;

  if (!data.path) {
    pathEl.value = joinPath(HOME, '.example-starter/', 'graphics-examples/');
  } else {
    pathEl.value = data.path;
  }
});

storage.get('preferredEditor', (err, data) => {
  if (err) throw err;

  if (!data.editor) {
    editorEl.value = process.env.EDITOR || 'default';
  } else {
    editorEl.value = data.editor;
  }
});
