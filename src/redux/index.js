/**
 * Redux reducers
 */

import {
  LOAD_TEMPLATE_DATA,
  SELECT_CHART_TEMPLATE,
  LOAD_USER_DATA,
} from './actions';

const initialState = {
  templates: [],
  selectedTemplate: null,
  userData: [],
};

export default function vocabApp(state = initialState, action) {
  switch(action.type) {
    case LOAD_TEMPLATE_DATA:
      return {
        ...state,
        templates: state.templates.concat(action.templates),
      };
    case SELECT_CHART_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.selectedTemplate,
      };
    case LOAD_USER_DATA:
      return {
        ...state,
        userData: state.userData.concat(action.userData),
      };
    default:
      return state;
  }
}
