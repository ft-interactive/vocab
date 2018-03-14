// @flow

import {
  LOAD_TEMPLATE_DATA,
  SELECT_CHART_TEMPLATE,
  LOAD_USER_DATA,
  SAVE_SPREADSHEET,
  SYNC_REPO
} from '../actions/vocab';

export type sheetDataType = {
  rows: (?(string[]))[]
};

export type vocabStateType = {
  templates: templateType[],
  selectedTemplate: string | null,
  userData: string[][],
  sheetData: ?sheetDataType
};

export type templateType = {
  chartName: string,
  category: string,
  img: string,
  avail: string,
  description: string,
  disabled: ?boolean | void
};

type actionType = {
  +type: string,
  payload?: any,
  selectedTemplate?: string,
  userData?: (?(string[]))[],
  sheetData?: sheetDataType
};

const initialState: vocabStateType = {
  templates: [],
  selectedTemplate: null,
  userData: [],
  sheetData: {
    rows: []
  }
};

export default function vocabApp(state: vocabStateType = initialState, action: actionType) {
  switch (action.type) {
    case SYNC_REPO:
      return {
        ...state,
        repoUpdated: action.payload
      };
    case LOAD_TEMPLATE_DATA:
      return {
        ...state,
        templates: state.templates.concat(action.payload).filter(d => d && d.chartName !== '')
      };
    case SELECT_CHART_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.selectedTemplate
      };
    case LOAD_USER_DATA:
      return {
        ...state,
        userData: state.userData.concat(action.userData)
      };
    case SAVE_SPREADSHEET:
      return {
        ...state,
        sheetData: action.sheetData
      };
    default:
      return state;
  }
}
