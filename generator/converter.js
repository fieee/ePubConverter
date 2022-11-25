#!/usr/bin/env node

const axios = require('axios');
const path = require('node:path');
const Promise = require('promise');
const {access, mkdir, openSync, readFileSync, writeFile} = require('fs');
const builder = require('xmlbuilder');

/*
let xml = builder.create('root')
    .ele('xmlbuilder')
    .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
    .end({ pretty: true});

console.log(xml);

 */


mkdirSync('temp_blank_book/META-INF',function () {
})
//write container



writeFile('./temp_blank_book/META-INF/container.xml', containerData, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(readFileSync("container.xml", "utf8"));
  }
});

//write template cover
let coverData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:epub=\"http://www.idpf.org/2007/ops\" xml:lang=\"en\">\n" +
    "<head>\n" +
    "\t<meta name=\"viewport\" content=\"width=760, height=1000\" />\n" +
    "\t<meta charset=\"UTF-8\"/>\n" +
    "\t<title>Cover</title>\n" +
    "\t<link href=\"css/style.css\" type=\"text/css\" rel=\"stylesheet\"/>\n" +
    "</head>\n" +
    "<body>\n" +
    "\t<div id=\"cover\">\n" +
    "\t\t<img src=\"images/book_cover.jpg\" alt=\"An image is worth a thousand words, add some here.\" />\n" +
    "\t</div>\n" +
    "</body>\n" +
    "</html>"

writeFile('./temp_blank_book/OEBPS/cover.xhtml', coverData, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(readFileSync("container.xml", "utf8"));
  }
});

mkdirSync('temp_blank_book/OEBPS/audio',function () {
})
mkdirSync('temp_blank_book/OEBPS/css',function () {
})
mkdirSync('temp_blank_book/OEBPS/image',function () {
})
mkdirSync('temp_blank_book/OEBPS/smil',function () {
})

/*axios.get('http://www.gutenberg.org/files/2701/2701-0.txt').

  then(res => res.data).
  then(text => {
    text = text.slice(text.indexOf('EXTRACTS.'));
    text = text.slice(text.indexOf('CHAPTER 1.'));

    const lines = text.split('\r\n');
    const content = [];
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      if (line.startsWith('CHAPTER ')) {
        if (content.length) {
          content[content.length - 1].data = content[content.length - 1].data.join('\n');
        }
        content.push({
          title: line,
          data: ['<h2>' + line + '</h2>']
        });
      } else if (line.trim() === '') {
        if (content[content.length - 1].data.length > 1) {
          content[content.length - 1].data.push('</p>');
        }
        content[content.length - 1].data.push('<p>');
      } else {
        content[content.length - 1].data.push(line);
      }
    }

    const options = {
      title: 'Moby-Dick',
      author: 'Herman Melville',
      output: './moby-dick.epub',
      content
    };

    return new epub(options).promise;
  }).
  then(() => console.log('Done'));

 */

 