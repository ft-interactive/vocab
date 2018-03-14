/**
 * Redux actions
 */

import { push } from 'react-router-redux';
import { createAliasedAction } from 'electron-redux';
import Papa from 'papaparse';
import buildProjectMain from '../../main/build-project';
import postBuild from '../../main/post-build';

export const LOAD_TEMPLATE_DATA = 'LOAD_TEMPLATE_DATA';
export const SELECT_CHART_TEMPLATE = 'SELECT_CHART_TEMPLATE';
export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const SAVE_SPREADSHEET = 'SAVE_SPREADSHEET';
export const BUILD_PROJECT = 'BUILD_PROJECT';
export const POST_BUILD_PROJECT = 'POST_BUILD_PROJECT';
export const SYNC_REPO = 'SYNC_REPO';

export const syncRepo = createAliasedAction(SYNC_REPO, status => ({
  type: SYNC_REPO,
  payload: status
}));

export const loadTemplateData = createAliasedAction(LOAD_TEMPLATE_DATA, templates => ({
  type: LOAD_TEMPLATE_DATA,
  payload: templates
}));

export const selectChartTemplate = templateName => ({
  type: SELECT_CHART_TEMPLATE,
  selectedTemplate: templateName
});

export const loadUserData = files => dispatch =>
  new Promise((resolve, reject) => {
    Papa.parse(files[0], {
      header: false,
      complete: ({ data: userData }) => resolve(userData),
      error: err => reject(err)
    });
  })
    .then(result =>
      dispatch({
        type: LOAD_USER_DATA,
        userData: result
      })
    )
    .then(() => dispatch(push('/configure-data')));

export const saveSpreadsheet = (selectedTemplate, sheetData) => dispatch =>
  Promise.resolve(
    dispatch({
      type: SAVE_SPREADSHEET,
      sheetData
    })
  )
    .then(() => dispatch(buildProject(selectedTemplate, sheetData)))
    .catch(console.error);

export const buildProject = createAliasedAction(
  BUILD_PROJECT,
  (chartType, spreadsheetData) => dispatch =>
    buildProjectMain(chartType, spreadsheetData)
      .then(postBuild)
      .then(payload =>
        dispatch({
          type: BUILD_PROJECT,
          payload
        })
      )
      .then(() => dispatch(push('/')))
);
