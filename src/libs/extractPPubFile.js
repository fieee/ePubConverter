/**
 * unzip the pPub file to the system temp folder and return the path
 * @param {string} inputFile  input path of pPub file
 * @return {string} temp folder path
 */
const os = require('os');
const fs = require('fs');
const path = require('path');
const {unzip} = require('zip-unzip-promise');

module.exports = async (inputFile) => {
  if (!fs.existsSync(inputFile)) throw new Error("Input file does not exist");
  const ppubPath = fs.mkdtempSync(path.join(os.tmpdir(), 'ppub-'));
  if(process.env.VERBOSE) console.log('pPub temp folder = ', ppubPath);
  await unzip(inputFile, ppubPath, { overwrite:true });
  return ppubPath;
}