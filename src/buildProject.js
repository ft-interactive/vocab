/**
 * This does the heavy lifting once the app starts copying charts over.
 */

const storage = require('electron-json-storage');
const HOME = require('os').homedir();

function buildProject(evt, { data, project }) {
  const { dialog } = require('electron');
  const { copydir, readFile, writeFile } = require('sander');
  const { join, basename } = require('path');
  const { unparse } = require('papaparse');

  const dataFilename = basename(data.path, '.txt');

  const meta = !data.metadata ? '' :
    data.metadata.map(val =>
      (Array.isArray(val) && val.length === 2 ? val.join('\t') : '')
    ).join('\n');

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

  storage.get('vocabPath', async (err, config) => {
    const path = config.path || join(HOME, '.vocab/', 'visual-vocabulary/');
    let index;

    try {
      await copydir(join(path, project)).to(savePath);
      index = await readFile(join(path, project, 'index.html'), { encoding: 'utf8' });
    } catch (e) {
      console.error(e);
    }

    // Replace defaults with metadata...
    data.metadata.forEach(line => {
      // ZALGO COMETH!
      // eslint-disable-next-line max-len
      const reMeta = new RegExp(`^(\\s*(?:var|let|const) ${line[0]}\\s?=\\s?)(["'\`])[^"'\`]+(["'\`]\\s?\\;?)(?:\/\/.*)?$`, 'igm');
      if (line[0] === 'source') {
        index = index.replace(reMeta, `$1'${line[1].replace(/'/g, '\\\'')}';`);
      } else {
        index = index.replace(reMeta, `$1'Source: ${line[1].replace(/'/g, '\\\'')}';`);
      }
    });

    const reData = /^(\s*(?:var|let|const)\s?dataURL\s?=\s?["'])(?:[^"']*)(["'].*?);?$/igm;
    index = index.replace(reData, `$1${dataFilename}.csv$2;`);

    try {
      await writeFile(join(savePath, 'index.html'), index);
      await writeFile(join(savePath, `${dataFilename}.csv`), csv);
      await writeFile(join(savePath, `${dataFilename}.meta.tsv`), meta);
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

module.exports = buildProject;
