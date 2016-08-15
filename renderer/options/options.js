/**
 * Options dialog logic
 */


const storage = require('electron-json-storage');
const joinPath = require('path').join;
const HOME = require('os').homedir();

const pathEl = document.getElementById('example-path');
const editorEl = document.getElementById('preferred-editor');

document.getElementById('save').addEventListener('click', () => {
  const win = require('electron').remote.getCurrentWindow();

  const example = new Promise((res, rej) => {
    storage.set('examplePath', { path: pathEl.value }, err => (err ? rej(err) : res()));
  });

  const editor = new Promise((res, rej) => {
    storage.set('preferredEditor', { editor: editorEl.value }, err => (err ? rej(err) : res()));
  });

  Promise.all([example, editor]).then(win.close);
});

document.getElementById('cancel').addEventListener('click', () => {
  require('electron').remote.getCurrentWindow().close();
});

const EDITORS = new Map();
EDITORS.set('Sublime Text', 'Sublime Text.app');
EDITORS.set('Atom', 'Atom.app');
EDITORS.set('Brackets', 'Brackets.app');

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
