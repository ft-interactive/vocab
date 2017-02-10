/**
 * This updates the visual-vocabulary repo on app launch
 */

function manageVisualVocabularyRepo(data, win) {
  const stat = require('fs').statSync;
  const joinPath = require('path').join;
  const mkdir = require('fs').mkdir;
  const storage = require('electron-json-storage');
  const HOME = require('os').homedir();

  let path = data.path;

  if (!path) {
    path = joinPath(HOME, '.vocab/', 'visual-vocabulary/');
    storage.set('vocabPath', { path }, error => {
      if (error) throw error;
    });
  }
  const visualVocabularyRepoUrl = 'https://github.com/ft-interactive/visual-vocabulary.git';
  const Git = require('simple-git')();

  win.webContents.send('repo-message', 'visual-vocabulary repo updating...');

  // Create parent config dir if doesn't exist
  try {
    stat(joinPath(HOME, '.vocab'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      mkdir(joinPath(HOME, '.vocab'), error => {
        if (error) console.error(error);
      });
    }
  }

  // If Visual Vocabulary directory doesn't exist, clone fresh.
  try {
    stat(joinPath(path, '/.git'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      Git.clone(visualVocabularyRepoUrl, path, (error) => {
        if (error) console.error(error);
        else console.info(`Visual Vocabulary cloned to ${path}`);
      });
    }
  }

  // Set Git path to visual-vocabulary repo.
  Git.cwd(path);

  // Pull from GitHub
  Git.pull(error => {
    if (error) {
      // This is likely a merge conflict due to weirdness in the Visual Vocab dir
      if (error.match('overwritten by merge')) {
        Git.reset('hard', err => {
          if (err) console.error(err);
          Git.clean('f', ['-d'], (err2) => {
            if (err) console.error(err2);
            else Git.pull(console.error);
          });
        });
      }
    }
  })
  .then(() => {
    console.info('Update done');
    if (win.webConents) win.webContents.send('repo-message', 'visual-vocabulary update complete.');
  });
}

module.exports = manageVisualVocabularyRepo;
