#!/usr/bin/env node
const args = require('args');
const path = require('path');
const libs = require('./libs');

(async() => {
  args
      .option('inputFile', 'Input Pickatale pPub file')
      .option('outputDir', 'Output dir for generated ePub files' )
      .option('verbose', 'Display more debug information', false)

  const flags = args.parse(process.argv, {})

  // check all required paramters
  if (!flags.inputFile) args.showHelp();
  if (!flags.outputDir) args.showHelp();
  if (flags.verbose) process.env.VERBOSE = true;

  const filename = path.basename(flags.inputFile, path.extname(flags.inputFile));
  const ppubPath = await libs.extractPPubFile(flags.inputFile);
  const epubPath = await libs.createEmptyEPUBFolder();
  const bookData = await libs.parsepPubFile(ppubPath);
  const options = { epubPath, ppubPath, bookData };

  let contentOPF;
  let pageId = 0;
  for(const page of bookData.pages) {
    //geenerate page by page
    await libs.createPageXHTML(page, options);
    await libs.createPageSMIL(page, options);
    await libs.copyPageResourceFiles(page, options);
    contentOPF = await libs.updateContentOPF(contentOPF, options)
  }
  await libs.generateFinalizedEPUB(contentOPF,
            epubPath, path.join(flags.outputDir, filename));
  await libs.cleanupTempFiles([ppubPath, epubPath]);

  console.log('Completed');
})()