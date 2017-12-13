/**
 * Redux actions
 */

import load from '@financial-times/load-data';
import { push } from 'react-router-redux';

const templates = load('../../templates/docs/chartTypes.csv');

export const LOAD_TEMPLATE_DATA = 'LOAD_TEMPLATE_DATA';
export const SELECT_CHART_TEMPLATE = 'SELECT_CHART_TEMPLATE';
export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const SAVE_SPREADSHEET = 'SAVE_SPREADSHEET';

export const loadTemplateData = () => (dispatch, getState) => {
  if (!getState().vocabApp.templates.length) {
    return templates.then(data => dispatch({
      type: LOAD_TEMPLATE_DATA,
      templates: data,
    }));
  }
};

export const selectChartTemplate = (templateName) => ({
  type: SELECT_CHART_TEMPLATE,
  selectedTemplate: templateName,
});

export const loadUserData = (files) => (dispatch) =>
  load(files)
  .then(result => dispatch({
    type: LOAD_USER_DATA,
    userData: Array.isArray(result) && result.length > 0 && Array.isArray(result[0])
      ? result
      : Array(result),
  }))
  .then(() => dispatch(push('/configure-data')));

export const saveSpreadsheet = (sheetData) => ({
  type: SAVE_SPREADSHEET,
  sheetData: sheetData
});
