const fs = require('fs');
const path = require('path');

module.exports = async (bookFolder) => {
  const dataFile  = path.join(bookFolder,'data/book.json');
  if (!fs.existsSync(dataFile)) throw new Error("book.json data file does not exist");
  const bookData = JSON.parse(fs.readFileSync(dataFile, {encoding: 'utf-8'}));
  if(process.env.VERBOSE) console.log('pages loaded = ', bookData.pages.length);
  return bookData;
}