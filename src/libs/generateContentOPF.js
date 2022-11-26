const fs = require('fs');
const path = require('path');
const ejs = require('ejs-promise');
const uuid = require('uuid');
const copy = require('recursive-copy');

module.exports = async (bookData, options) => {
  const fileRoot = path.join(options.epubPath, 'OBEPS');
  const filename = path.join(fileRoot, `content.opf`);

  const resolution = `${bookData.pages[0].width}x${bookData.pages[0].height}`;
  const publishDate = new Date().toISOString();
  const modifiedDate = new Date().toISOString();
  const bookName = 'NO NAME';
  const language = 'en-GB';
  const publisher = 'Pickatale AS';
  const bookId = uuid.v4();
  const bookType = 'comic',
  const data = {
    ...bookData,
    resolution,
    publishDate,
    modifiedDate,
    language,
    bookName,
    publisher,
    bookId,
    bookType,
  };

  //fetch cover.jpg
  const coverImageURL = bookData.pages[0].file
  await copy(path.join(options.ppubPath, 'data', coverImageURL),
             path.join(fileRoot, 'images', 'cover.jpg'));

  const templateFile = path.normalize(path.join(path.dirname(__dirname), 'templates','content','content.opf.ejs'));
  const templateData = fs.readFileSync(templateFile, 'utf-8');
  const renderedData = await ejs.render(templateData, data, { rmWhitespace: true});

  fs.writeFileSync(filename, renderedData);
  if(process.env.VERBOSE) console.log('content opf file generated = ', filename);
  return filename;
}