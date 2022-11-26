const fs = require('fs');
const path = require('path');
const ejs = require('ejs-promise');

module.exports = async (bookData, options) => {
  const fileRoot = path.join(options.epubPath, 'OEBPS');
  const filename = path.join(fileRoot, `toc.xhtml`);

  //generate page title
  for (let idx in bookData.pages) {
    const page = bookData.pages[idx];
    let i = 0;
    let title = ""
    for (let word of page.textBlocks[0].textAreas[0].words) {
      title += word.word + ' ';
      i++; if (i > 3) break;
    }
    bookData.pages[idx].title = title + '...';
  }

  const data = {
    ...bookData,
    width: bookData.pages[0].width,
    height: bookData.pages[0].height,
  };

  const templateFile = path.normalize(path.join(path.dirname(__dirname), 'templates','content','toc.xhtml.ejs'));
  const templateData = fs.readFileSync(templateFile, 'utf-8');
  const renderedData = await ejs.render(templateData, data, { rmWhitespace: true});

  fs.writeFileSync(filename, renderedData);
  if(process.env.VERBOSE) console.log('Table of content file generated = ', filename);
  return filename;
}