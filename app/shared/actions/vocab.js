/**
 * Redux actions
 */

import { push } from 'react-router-redux';
import { createAliasedAction } from 'electron-redux';

export const LOAD_TEMPLATE_DATA = 'LOAD_TEMPLATE_DATA';
export const SELECT_CHART_TEMPLATE = 'SELECT_CHART_TEMPLATE';
export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const SAVE_SPREADSHEET = 'SAVE_SPREADSHEET';

export const loadTemplateData = createAliasedAction(LOAD_TEMPLATE_DATA, templates => ({
  type: LOAD_TEMPLATE_DATA,
  payload: templates
}));

export const selectChartTemplate = templateName => ({
  type: SELECT_CHART_TEMPLATE,
  selectedTemplate: templateName
});

// export const loadUserData = createAliasedAction(LOAD_USER_DATA, files => ({
//   type: LOAD_USER_DATA,
//   payload: new Promise((resolve, reject) => {
//     Papa.parse(files[0], {
//       header: false,
//       complete: ({ data: userData }) => resolve(userData),
//       error: err => reject(err)
//     });
//   })
//   // I don't know how this will work here...
//   // .then(data => {
//   //   push('/configure-data');
//   //   return data;
//   // })
// }));

export const saveSpreadsheet = sheetData => ({
  type: SAVE_SPREADSHEET,
  sheetData
});
