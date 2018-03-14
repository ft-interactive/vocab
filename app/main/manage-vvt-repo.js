/**
 * This updates the visual-vocabulary repo on app launch
 *
 * @flow
 */

import simpleGit from 'simple-git';
import type { Store } from 'redux';
import { syncRepo } from '../shared/actions/vocab';

export default async function syncVVTRepo(store: Store<*, *, *>) {
  const path = `${__dirname}/templates/`;
  const Git = simpleGit(path);
  try {
    await Git.submoduleUpdate(['recursive']);
    store.dispatch(syncRepo(true));
  } catch (e) {
    console.error(e);
    store.dispatch(syncRepo(false));
  }
}
