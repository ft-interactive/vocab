/**
 * This does the heavy lifting once the app starts copying charts over.
 */

const storage = require('electron-json-storage');
const HOME = require('os').homedir();

function buildExample(evt, { data, example }) {
  const { dialog } = require('electron');
  const { copydir, readFile, writeFile } = require('sander');
  const { join, basename } = require('path');
  const { unparse } = require('papaparse');

  const dataFilename = basename(data.path, '.txt');
  const meta = !data.meta ? '' :
    data.meta.map(val => (Array.isArray(val) && val.length === 2 ? val.join('\t') : '')).join('\n');
  let csv;

  try {
    csv = unparse(data.processed, { quotes: true });
  } catch (e) {
    console.error(e);
  }

  const savePath = dialog.showSaveDialog({
    title: 'Choose a directory to save your project...',
  });

  if (!savePath) {
    evt.sender.send('cancelProject', {
      type: 'error',
      title: 'Project cancelled!',
      message: 'Project cancelled',
      detail: 'Please select a directory',
    });
  }

  storage.get('examplePath', async (err, config) => {
    const path = config.path || join(HOME, '.example-starter/', 'graphics-examples/');
    let index;

    try {
      await copydir(join(path, example)).to(savePath);
      index = await readFile(join(path, example, 'index.html'), { encoding: 'usc2' });
    } catch (e) {
      console.error(e);
    }

    // Replace defaults with metadata...
    data.metadata.forEach(item => {
      // ZALGO COMETH!
      const re = new RegExp(`(\\s*(?:var|let) ${item[0]}\\s?=\\s?)(?:'([^']*)'|"([^"]*)")`);
      index = index.replace(re, `$1'${item[1]}'`);
    });

    try {
      await writeFile(join(savePath, 'index.html'), index, { encoding: 'usc2' });
      await writeFile(join(savePath, `${dataFilename}.csv`), csv, { encoding: 'usc2' });
      await writeFile(join(savePath, `${dataFilename}.meta.tsv`), meta, { encoding: 'usc2' });
    } catch (e) {
      console.error(e);
    }

    evt.sender.send('reload', {
      type: 'info',
      title: 'Project successful created',
      message: 'Project successful created',
      detail: `Project started in ${savePath}`,
      path: savePath,
    });
  });
}

module.exports = buildExample;
