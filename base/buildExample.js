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

  storage.get('examplePath', async (err, config) => {
    const path = config.path || join(HOME, '.example-starter/', 'graphics-examples/');
    let index;

    try {
      await copydir(join(path, example)).to(savePath);
      index = await readFile(join(path, example, 'index.html'), { encoding: 'utf-8' });
    } catch (e) {
      console.error(e);
    }

    // Replace defaults with metadata...
    Object.keys(data.metadata).forEach(key => {
      const re = new RegExp(`\s*var ${key}\s?=\s?(?:'([^']*)'|"([^"]*)")`); // ZALGO COMETH!
      index = index.replace(re, data.metadata[key]);
    });

    try {
      await writeFile(join(savePath, 'index.html'), index, { encoding: 'utf-8' });
      await writeFile(join(savePath, `${dataFilename}.csv`), csv, { encoding: 'utf-8' });
      await writeFile(join(savePath, `${dataFilename}.meta.tsv`), meta, { encoding: 'utf-8' });
    } catch (e) {
      console.error(e);
    }
  });
}

module.exports = buildExample;
