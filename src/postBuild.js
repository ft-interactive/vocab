/**
 * This handles post-build tasks
 */

function postBuild(e, path) {
  const { spawn } = require('child_process');
  const exists = require('command-exists');
  const storage = require('electron-json-storage');

  try {
    exists('srvlr', (err, srvlr) => {
      if (srvlr) {
        // Open up new Terminal and run srvlr if it exists
        /* eslint-disable quotes */
        spawn('osascript', [
          '-e',
          `'tell application "terminal"'`,
          '-e',
          `'do script "cd ${path} && srvlr"'`,
          '-e',
          `'end tell'`,
        ], {
          detached: true,
          shell: true,
        });
      } else {
        // Or just open a Terminal if not.
        spawn('osascript', [
          '-e',
          `'tell application "terminal"'`,
          '-e',
          `'do script "cd ${path}"'`,
          '-e',
          `'end tell'`,
        ], {
          detached: true,
          shell: true,
        });
        /* eslint-disable-end */
      }
    });
  } catch (err) {
    console.error(err);
  }

  storage.get('preferredEditor', (err, { editor }) => {
    if (err) throw err;

    try {
      switch (editor) {
        case 'default':
          spawn('open', path, {
            detached: true,
            shell: true,
          });
          break;
        case 'none':
          break;
        default:
          spawn('open', ['-a', editor, path], {
            detached: true,
            shell: true,
          });
          break;
      }
    } catch (error) {
      console.error(error);
    }
  });
}

module.exports = postBuild;
