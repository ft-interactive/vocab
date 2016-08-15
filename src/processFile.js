/**
 * This processes the text files into JSON.
 */

function processFile(filePath) {
  const { extractComments, cleanInput } = require('text-converter/lib');
  const read = require('fs').readFileSync;

  const raw = read(filePath, { encoding: 'utf-8' });
  const meta = extractComments(raw);
  const processed = cleanInput(raw, meta);

  return {
    meta,
    processed,
    filePath,
  };
}

module.exports = processFile;
