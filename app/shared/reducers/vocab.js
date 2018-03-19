// @flow

import {
  LOAD_TEMPLATE_DATA,
  SELECT_CHART_TEMPLATE,
  LOAD_USER_DATA,
  SAVE_SPREADSHEET,
  SYNC_REPO
} from '../actions';

export type sheetDataType = {
  rows: (?(string[]))[]
};

export type vocabStateType = {
  templates: templateType[],
  categories: categoryType[],
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

export type categoryType = {
  category: string,
  colour: string,
  description: string,
  example: string
};

type actionType = {
  +type: string,
  selectedTemplate?: string,
  userData?: (?(string[]))[],
  sheetData?: sheetDataType,
  templates?: templateType[],
  categories?: categoryType[],
  docsPath: string
};

const initialState: vocabStateType = {
  templates: [],
  categories: [],
  selectedTemplate: null,
  userData: [],
  sheetData: {
    rows: []
  },
  docsPath: '',
};

export default function vocabApp(state: vocabStateType = initialState, action: actionType) {
  switch (action.type) {
    case SYNC_REPO:
      return {
        ...state,
      };
    case LOAD_TEMPLATE_DATA:
      return {
        ...state,
        templates: action.templates,
        categories: action.categories,
        docsPath: action.docsPath,
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
