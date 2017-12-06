/**
 * @file
 * Data configuration
 */

import React from 'react';
import SpreadsheetComponent from 'react-spreadsheet-component';
import 'react-spreadsheet-component/styles/excel.css';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './index.css';


const config = {
    // Initial number of row
    rows: 1,
    // Initial number of columns
    columns: 2,
    // True if the first column in each row is a header (th)
    hasHeadColumn: true,
    // True if the data for the first column is just a string.
    // Set to false if you want to pass custom DOM elements.
    isHeadColumnString: true,
    // True if the first row is a header (th)
    hasHeadRow: true,
    // True if the data for the cells in the first row contains strings.
    // Set to false if you want to pass custom DOM elements.
    isHeadRowString: true,
    // True if the user can add rows (by navigating down from the last row)
    canAddRow: true,
    // True if the user can add columns (by navigating right from the last column)
    canAddColumn: true,
    // Override the display value for an empty cell
    emptyValueSymbol: '-',
    // Fills the first column with index numbers (1...n) and the first row with index letters (A...ZZZ)
    hasLetterNumberHeads: true
};

const configureData = ({ userData, selectedTemplate, templates, redirect }) => {
  // console.log(selectedTemplate, !templates.length, !userData.length, userData)
  // if (!selectedTemplate || !templates.length || !userData.length) {
  //   redirect('/');
  //   return null;
  // };
  const data = userData.length ? userData[0] : null;
  const template = templates.find(() => selectedTemplate);

  console.dir(template, data);
  if (data) {
    const rows = {
      rows: data.reduce((acc, cur, idx) => {
        if (idx === 0) {
          acc.push(Array(Object.keys(cur).length + 1).fill(''));
          acc.push(['-', ...Object.keys(cur)]);
        };
        return acc.concat([['-', ...Object.values(cur)]]);
      }, [])
    }
    return (
      <div className="data-view__container">
        <h3>Dimensions</h3>
        <div>

        </div>
        <SpreadsheetComponent
          initialData={rows}
          config={config}
          spreadsheetId="1"
        />
      </div>
    );
  }

  return null;
}

export default connect(state => ({
  userData: state.vocabApp.userData,
  templates: state.vocabApp.templates,
  selectedTemplate: state.vocabApp.selectedTemplate,
}), dispatch => ({
  redirect: (path) => dispatch(push(path)),
}))(configureData);
