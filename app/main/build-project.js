/**
 * This does the heavy lifting once the app starts copying charts over.
 */

import { dialog } from 'electron';
import { copy, outputFile } from 'fs-extra';
import { join } from 'path';
import { unparse } from 'papaparse';

export default async function buildProject(templateData, spreadsheetData) {
  try {
    const csvData = unparse(spreadsheetData, { quotes: true });
    const savePath = dialog.showSaveDialog({
      title: 'Choose a directory to save your project...'
    });

    const templatePath = join(__dirname, '..', '..', 'templates');

    await copy(join(templatePath, templateData.templatePath), savePath);
    await outputFile(join(savePath, 'data.csv'), csvData);
    console.log(`Saving to: ${savePath}`);
    return savePath;
  } catch (e) {
    console.error(e);
    // @TODO Handle errors here more elegantly
  }
}
