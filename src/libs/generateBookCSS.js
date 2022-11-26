const fs = require('fs');
const path = require('path');
const ejs = require('ejs-promise');

module.exports = async (bookData, options) => {
  const fileRoot = path.join(options.epubPath, 'OBEPS');
  const filename = path.join(fileRoot, `book.css`);

  const data = { styles: bookData.formatConfigurations };
  const templateFile = path.normalize(path.join(path.dirname(__dirname), 'templates','content','book.css.ejs'));
  const templateData = fs.readFileSync(templateFile, 'utf-8');
  const renderedData = await ejs.render(templateData, data, { rmWhitespace: true});

  fs.writeFileSync(filename, renderedData);
  if(process.env.VERBOSE) console.log('book css file generated = ', filename);
  return filename;
}