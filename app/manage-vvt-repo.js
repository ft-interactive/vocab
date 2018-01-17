/**
 * This updates the visual-vocabulary repo on app launch
 *
 * @flow
 */

import simpleGit from 'simple-git';
import type { BrowserWindow } from 'electron';

export default async function syncVVTRepo(win: BrowserWindow) {
  const path = 'templates/';
  const Git = simpleGit(path);

  win.webContents.send('repo-message', 'visual-vocabulary-templates repo updating...');

  await Git.submoduleUpdate(['recursive']);
  console.info('Update done');
  if (win.webConents) win.webContents.send('repo-message', 'Repo update complete.');
}
