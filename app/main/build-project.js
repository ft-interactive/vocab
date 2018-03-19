/**
 * This does the heavy lifting once the app starts copying charts over.
 */

import { dialog } from 'electron';
import { copy, outputFile, readFile, writeFile } from 'fs-extra';
import { join } from 'path';
import { unparse } from 'papaparse';
import { homedir } from 'os';
import sed from 'parse-sed';

const HOME = homedir();

export default async function buildProject(templateData, spreadsheetData) {
  try {
    const csvData = unparse(spreadsheetData, { quotes: true });
    const savePath = dialog.showSaveDialog({
      title: 'Choose a directory to save your project...'
    });

    console.log(`Saving to: ${savePath}`);

    const templatePath = join(HOME, '.vocab/', 'visual-vocabulary-templates/');

    await copy(join(templatePath, templateData.templatePath), savePath);
    await outputFile(join(savePath, 'data.csv'), csvData);

    // Load index.js as string for replacements
    const indexJs = await readFile(`${savePath}/index.js`, 'utf-8');

    // Create array of substitutions from "replace_x" columns
    const replacements = Object.entries(templateData)
      .sort(([key1], [key2]) => key1 > key2)
      .filter(([key]) => key.includes('replace_'))
      .map(([, val]) => val);

    // Make replacements
    const replacedIndexJs = replacements.reduce((str, subStr) => {
      const { commands } = sed(subStr);
      if (commands && commands.length) {
        const sub = commands.find(c => c.verb === 's');
        return str.replace(sub.re, sub.replacement);
      }

      return str;
    }, indexJs);

    await writeFile(`${savePath}/index.js`, replacedIndexJs, 'utf-8');

    return savePath;
  } catch (e) {
    console.error(e);
    // @TODO Handle errors here more elegantly
  }
}
