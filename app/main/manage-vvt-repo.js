/**
 * This updates the visual-vocabulary repo on app launch
 *
 * @flow
 */

import simpleGit from 'simple-git/promise';
import type { Store } from 'redux';
import { statSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { syncRepo } from '../shared/actions';

const HOME = homedir();
const VVTUrl = 'git@github.com:ft-interactive/visual-vocabulary-templates.git';

export default async function syncVVTRepo(store: Store<*, *, *>) {
  const path = join(HOME, '.vocab/', 'visual-vocabulary-templates/');
  const Git = simpleGit();

  // Create parent config dir if doesn't exist
  try {
    statSync(join(HOME, '.vocab'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      try {
        mkdirSync(join(HOME, '.vocab'));
      } catch (ee) {
        console.error(ee);
      }
    }
  }

  // If Visual Vocabulary directory doesn't exist, clone fresh.
  try {
    statSync(join(path, '/.git'));
  } catch (e) {
    if (e.code === 'ENOENT') {
      try {
        await Git.clone(VVTUrl, path);
        console.info(`Visual Vocabulary cloned to ${path}`);
      } catch (ee) {
        console.error(ee);
      }
    }
  }

  try {
    // Set Git path to visual-vocabulary repo.
    Git.cwd(path);

    // Pull from GitHub
    await Git.pull();
    console.info('Update done');
    store.dispatch(syncRepo(true));
  } catch (e) {
    console.error(e);
    // This is likely a merge conflict due to weirdness in the Visual Vocab dir
    if (e.match('overwritten by merge')) {
      try {
        await Git.reset('hard');
        await Git.clean('f', ['-d']);
      } catch (ee) {
        try {
          await Git.pull(console.error);
        } catch (eee) {
          console.error(eee); // @TODO find a better way of notifying the user
          store.dispatch(syncRepo(false));
        }
      }
    }
  }
}
