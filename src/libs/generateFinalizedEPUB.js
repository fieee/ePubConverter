const fs = require('fs');
const path = require('path');
const zipper = require('epub-zipper');

module.exports = async (epubPath, epubFile) => {
  if (!fs.existsSync(epubPath)) throw new Error("Input epub path does not exist");

  const options = {
    input: epubPath,
    output: path.dirname(epubFile),
    fileName: path.basename(epubFile, path.extname(epubFile)),
  }
  await zipper.create(options);
  if(process.env.VERBOSE) console.log('final ePub3 file  = ', epubFile);
  return epubFile;
}