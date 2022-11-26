/**
 * Delete all temp folders
 * @param {list} paths list to be deleted
 */
const fs = require('fs');

module.exports = async (paths) => {
  for (folder of paths) if(folder) fs.rmSync(folder, { recursive: true, force: true });
}