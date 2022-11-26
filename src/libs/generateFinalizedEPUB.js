const os = require('os');
const fs = require('fs');
const path = require('path');
const {zip} = require('zip-unzip-promise');

module.exports = async (epubPath, epubFile) => {
  if (!fs.existsSync(epubPath)) throw new Error("Input epub path does not exist");
  await zip(epubPath+'/', epubFile, { overwrite:true });
  if(process.env.VERBOSE) console.log('final ePub3 file  = ', epubFile);
  return epubFile;
}