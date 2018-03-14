/**
 * This handles post-build tasks
 */

import { spawn } from 'child_process';
import exists from 'command-exists';

export default function postBuild(path) {
  try {
    exists('srvlr', (err, srvlr) => {
      if (srvlr) {
        // Open up new Terminal and run srvlr if it exists
        /* eslint-disable quotes */
        spawn(
          'osascript',
          [
            '-e',
            `'tell application "terminal"'`,
            '-e',
            `'do script "cd ${path} && srvlr"'`,
            '-e',
            `'end tell'`
          ],
          {
            detached: true,
            shell: true
          }
        );
      } else {
        // Or just open a Terminal if not.
        spawn(
          'osascript',
          [
            '-e',
            `'tell application "terminal"'`,
            '-e',
            `'do script "cd ${path}"'`,
            '-e',
            `'end tell'`
          ],
          {
            detached: true,
            shell: true
          }
        );
        /* eslint-disable-end */
      }
    });
  } catch (err) {
    console.error(err);
  }

  // @TODO enable method for launching editor (needs a settings panel)
  // storage.get('preferredEditor', (err, { editor }) => {
  //   if (err) throw err;
  //
  //   try {
  //     switch (editor) {
  //       case 'default':
  //         spawn('open', path, {
  //           detached: true,
  //           shell: true
  //         });
  //         break;
  //       case 'none':
  //         break;
  //       default:
  //         spawn('open', ['-a', editor.replace(/\s/g, '\\ '), path], {
  //           detached: true,
  //           shell: true
  //         });
  //         break;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  return path;
}
