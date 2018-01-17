import Papa from 'papaparse';
import { readFileSync } from 'fs';

export default new Promise((resolve, reject) => {
  Papa.parse(readFileSync(`${__dirname}/../../templates/docs/chartTypes.csv`, 'utf-8'), {
    header: true,
    complete: ({ data }) => resolve(data),
    error: err => reject(err)
  });
});
