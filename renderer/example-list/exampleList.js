/**
 * This is the controller for the example-list template
 */

const { ipcRenderer, remote } = require('electron');
const { getIcon } = require('./getIcon');

(async function buildList() {
  const { readdir, statSync } = require('fs');
  const { join } = require('path');
  const storage = require('electron-json-storage');
  const { compile } = require('handlebars');

  const source = document.getElementById('list-item-template').innerHTML;
  const listItemTemplate = compile(source);

  const ignored = [
    'd3',
    '.git',
  ];

  try {
    const dirs = await new Promise((res, rej) => {
      storage.get('examplePath', (err, { path }) => {
        if (err) rej(err);
        readdir(path, (error, files) => {
          if (error) rej(error);
          else {
            res(
              files.filter(file => statSync(
                join(path, file)
              ).isDirectory() && !~ignored.indexOf(file)));
          }
        });
      });
    });

    const list = document.getElementById('items');

    dirs.forEach(dir => {
      const contents = listItemTemplate({
        name: dir,
        description: '',
        preview: '',
        icon: getIcon(dir),
      });

      const el = document.createElement('li');
      el.classList.add('list-group-item');
      el.innerHTML = contents;
      list.appendChild(el);
    });
  } catch (e) {
    console.error(e);
  }

  [...document.querySelectorAll('li.list-group-item')].forEach(el => {
    el.addEventListener('click', () => {
      const currActive = document.querySelector('li.list-group-item.active');
      if (currActive) currActive.classList.remove('active');
      el.classList.add('active');
    });
  });
}());

ipcRenderer.on('incoming-data', (evt, data) => {
  document.getElementById('cancel').addEventListener('click', () => {
    remote.getCurrentWindow().close();
  });

  document.getElementById('go').addEventListener('click', () => {
    try {
      const example = document.querySelector('li.list-group-item.active').innerText.trim();
      if (example) {
        ipcRenderer.send('build-example', {
          data,
          example,
        });

        ipcRenderer.on('cancelProject', (e, msg) => {
          const { type, title, message, detail } = msg;
          remote.dialog.showMessageBox({
            type,
            title,
            message,
            detail,
            buttons: [
              'Okay',
            ],
            noLink: true,
          }, () => {
            remote.getCurrentWindow().close();
          });
        });

        ipcRenderer.on('reload', (e, msg) => {
          const { type, title, message, detail, path } = msg;

          remote.dialog.showMessageBox({
            type,
            title,
            message,
            detail,
            buttons: [
              'Okay!',
            ],
            noLink: true,
          }, () => {
            ipcRenderer.send('post-build', path);
            remote.getCurrentWindow().close();
          });
        });
      }
    } catch (e) {
      // @TODO Handle no chart selected here.
    }
  });
});
