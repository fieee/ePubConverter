const os = require('os');
const fs = require('fs');
const path = require('path');
const copy = require('recursive-copy');

module.exports = async () => {
  const epubPath = fs.mkdtempSync(path.join(os.tmpdir(), 'epub-'));
  if(process.env.VERBOSE) console.log('ePub temp folder = ', epubPath);
  //copy empty template to the dst folde
  const templateFolder = path.normalize(path.dirname(__dirname) + '/templates/epub3');
  await copy(templateFolder, epubPath);

  return epubPath;
}