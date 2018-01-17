/**
 * @file
 * Data configuration
 */

import React from 'react';
import SpreadsheetComponent from 'react-spreadsheet-component';
import 'react-spreadsheet-component/styles/excel.css';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { saveSpreadsheet as saveSpreadsheetAction } from '../../shared/actions/vocab';
import type { sheetDataType, templateType } from '../../shared/reducers/vocab';
import './ConfigureData.css';

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
  // Fills the first column with index numbers (1...n)
  // and the first row with index letters (A...ZZZ)
  hasLetterNumberHeads: true
};

type Props = {
  userData: string[][],
  selectedTemplate: string,
  templates: templateType[],
  redirect: (path: string) => void,
  saveSpreadsheet: (sheets: sheetDataType) => void
};

const configureData = ({
  userData,
  selectedTemplate,
  templates,
  redirect,
  saveSpreadsheet
}: Props) => {
  // console.log(selectedTemplate, !templates.length, !userData.length, userData)
  if (!selectedTemplate || !templates.length || !userData.length) {
    redirect('/');
    return null;
  }

  // Grab only the first sheet -- if annotated, pull off the "data" attribute.
  const data =
    userData.length && Array.isArray(userData[0]) // eslint-disable-line no-nested-ternary
      ? userData[0]
      : userData[0].data ? userData[0].data : null;

  //  @TODO populate columns of template based on types returned by template
  // const template = templates.find(() => selectedTemplate);

  // console.dir(template, data);
  if (data) {
    const sheetData = {
      rows: data.reduce((acc, cur, idx) => {
        if (idx === 0) {
          // Add header row so it displays properly
          const headerRow = ['-', ...Object.keys(cur)];
          if (!Object.keys(cur).includes(() => 'annotate')) {
            headerRow.push('annotate');
          }
          if (!Object.keys(cur).includes(() => 'highlight')) {
            headerRow.push('highlight');
          }
          acc.push(headerRow);
          acc.unshift(Array(headerRow.length).fill(''));
        }

        const newRow = ['-', ...Object.values(cur)];
        newRow.length = acc[0].length;

        return [...acc, newRow.fill('', Object.values(cur).length + 1)];
      }, [])
    };

    return (
      <div className="data-view__container">
        {/* <h3>Dimensions</h3>
        <div>

        </div> */}
        <SpreadsheetComponent
          initialData={sheetData}
          config={config}
          spreadsheetId="spreadsheet-1"
        />
        <button onClick={() => saveSpreadsheet(sheetData)}>Create bundle</button>
      </div>
    );
  }

  return null;
};

export default connect(
  state => ({
    userData: state.vocabApp.userData,
    templates: state.vocabApp.templates,
    selectedTemplate: state.vocabApp.selectedTemplate
  }),
  dispatch => ({
    redirect: path => dispatch(push(path)),
    saveSpreadsheet: sheetData => dispatch(saveSpreadsheetAction(sheetData))
  })
)(configureData);
