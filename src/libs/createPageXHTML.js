const fs = require('fs');
const path = require('path');
const copy = require('recursive-copy');
const ejs = require('ejs-promise');

module.exports = async (page, options) => {
  // create xhtml page
  const fileRoot = path.join(options.epubPath, 'OBEPS');
  const filename = path.join(fileRoot, `page-${page.id}.xhtml`);

  // copy page resource files images / audio
  await copy(path.join(options.ppubPath, 'data', page.file),
             path.join(fileRoot, 'images', path.basename(page.file)));

  await copy(path.join(options.ppubPath, 'data', page.audioFile),
             path.join(fileRoot, 'audio', path.basename(page.audioFile)));

  // using ejs template to generate the page contten
  const templateFile = path.normalize(path.join(path.dirname(__dirname), 'templates','content','page.xhtml.ejs'));
  const templateData = fs.readFileSync(templateFile, 'utf-8');
  const renderedData = await ejs.render(templateData, page, { rmWhitespace: true});

  // write page file
  fs.writeFileSync(filename, renderedData);
  if(process.env.VERBOSE) console.log('ePub page file generated = ', filename);
  // process.exit();
  return filename;
}