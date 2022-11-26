const fs = require('fs');
const path = require('path');
const ejs = require('ejs-promise');
const uuid = require('uuid');
const copy = require('recursive-copy');
const getMP3Duration = require('get-mp3-duration')

module.exports = async (bookData, options) => {
  const fileRoot = path.join(options.epubPath, 'OEBPS');
  const filename = path.join(fileRoot, `content.opf`);

  // metadata
  const resolution = `${bookData.pages[0].width}x${bookData.pages[0].height}`;
  const publishDate = new Date().toISOString();
  const modifiedDate = new Date().toISOString();
  const bookName = 'NO NAME';
  const language = 'en-GB';
  const publisher = 'Pickatale AS';
  const bookId = uuid.v4();
  const bookType = 'comic';

  //audio durtion
  let totalDuration = 0;
  for (let idx in bookData.pages) {
    const page = bookData.pages[idx];
    const buffer = fs.readFileSync(path.join(options.ppubPath, 'data', page.audioFile));
    const duration = getMP3Duration(buffer);
    totalDuration += totalDuration/1000;
    bookData.pages[idx].duration = duration/1000;
  }

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
    totalDuration,
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