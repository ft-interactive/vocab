/**
 * This updates the graphics-examples repo on app launch
 */

function manageExamplesRepo(data, win) {
  const stat = require('fs').statSync;
  const joinPath = require('path').join;
  const mkdir = require('fs').mkdir;
  const storage = require('electron-json-storage');
  const HOME = require('os').homedir();

  let path = data.path;

  if (!path) {
    path = joinPath(HOME, '.example-starter/', 'graphics-examples/');
    storage.set('examplePath', { path }, error => {
      if (error) throw error;
    });
  }
  const graphicExamplesRepoUrl = 'https://github.com/ft-interactive/graphics-examples.git';
  const Git = require('simple-git')();

  win.webContents.send('repo-message', 'graphics-examples repo updating...');

  // Create parent config dir if doesn't exist
  try {
    stat(joinPath(HOME, '.example-starter'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      mkdir(joinPath(HOME, '.example-starter'), error => {
        if (error) console.error(error);
      });
    }
  }

  // If Graphics Examples directory doesn't exist, clone fresh.
  try {
    stat(joinPath(path, '/.git'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      Git.clone(graphicExamplesRepoUrl, path, (error) => {
        if (error) console.error(error);
        else console.info(`Graphics Examples cloned to ${path}`);
      });
    }
  }

  // Set Git path to graphics-examples repo.
  Git.cwd(path);

  // Pull from GitHub
  Git.pull(error => {
    if (error) console.error(error);
  })
  .then(() => {
    console.info('Update done');
    win.webContents.send('repo-message', 'graphics-examples update complete.');
  });
}

module.exports = manageExamplesRepo;
