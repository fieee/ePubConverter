const fs = require('fs');
const path = require('path');
const copy = require('recursive-copy');
const ejs = require('ejs-promise');

module.exports = async (page, options) => {
  // create xhtml page
  const fileRoot = path.join(options.epubPath, 'OEBPS');
  const filename = path.join(fileRoot, 'smil', `page-${page.id}.smil`);

  const data = {
    ...page,
    audioFile: path.join('audio', path.basename(page.audioFile)),
  }

  // using ejs template to generate the page contten
  const templateFile = path.normalize(path.join(path.dirname(__dirname), 'templates','content','page.smil.ejs'));
  const templateData = fs.readFileSync(templateFile, 'utf-8');
  const renderedData = await ejs.render(templateData, data, { rmWhitespace: true});

  // write page file
  fs.writeFileSync(filename, renderedData);
  if(process.env.VERBOSE) console.log('ePub smil file generated = ', filename);

  return filename;
}