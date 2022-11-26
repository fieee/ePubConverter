const os = require('os');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const epubPath = fs.mkdtempSync(path.join(os.tmpdir(), 'epub-'));
  if(process.env.VERBOSE) console.log('ePub temp folder = ', epubPath);
}