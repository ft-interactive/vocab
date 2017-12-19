/**
 * Redux actions
 */

import Papa from 'papaparse';
import { push } from 'react-router-redux';

const templates = fetch('../templates/docs/chartTypes.csv')
  .then(res => res.text())
  .then(txt => Papa.parse(txt, { header: true }).data);

export const LOAD_TEMPLATE_DATA = 'LOAD_TEMPLATE_DATA';
export const SELECT_CHART_TEMPLATE = 'SELECT_CHART_TEMPLATE';
export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const SAVE_SPREADSHEET = 'SAVE_SPREADSHEET';

export const loadTemplateData = () => (dispatch, getState) => {
  if (!getState().vocabApp.templates.length) {
    return templates.then(data =>
      dispatch({
        type: LOAD_TEMPLATE_DATA,
        templates: data
      })
    );
  }
};

export const selectChartTemplate = templateName => ({
  type: SELECT_CHART_TEMPLATE,
  selectedTemplate: templateName
});

export const loadUserData = files => dispatch =>
  new Promise((resolve, reject) => {
    Papa.parse(files[0], {
      header: false,
      complete: (err, userData) => {
        if (err) return reject(err);
        return resolve(
          dispatch({
            type: LOAD_USER_DATA,
            userData
          })
        );
      }
    });
  }).then(() => dispatch(push('/configure-data')));

export const saveSpreadsheet = sheetData => ({
  type: SAVE_SPREADSHEET,
  sheetData
});
