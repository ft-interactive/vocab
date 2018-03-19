import Papa from 'papaparse';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const HOME = homedir();
const vvtPath = join(HOME, '.vocab/', 'visual-vocabulary-templates/');
const categories = require(`${vvtPath}/docs/categories`);

export default async function () {
  const templates = await new Promise((resolve, reject) => {
    Papa.parse(
      readFileSync(
        join(vvtPath, 'docs/', 'chartTypes.csv'),
        'utf-8'
      ),
      {
        header: true,
        complete: ({ data }) => resolve(data),
        error: err => reject(err)
      }
    );
  });
  return {
    templates: templates.filter(d => d.chartName),
    categories: categories.filter(d => d.category),
  };
}
