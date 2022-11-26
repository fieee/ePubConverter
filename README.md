# ePubConverter

### Installtion
````sh
npm install
````

### Test
Below command will take ./misc/sample.ppub as input pPub file and generate epub3 format in user's default folder ~

````sh
./src/converter.js -i ./misc/sample.ppub -o ~/
````

verbose output for debug
````sh
./src/converter.js -i ./misc/sample.ppub -o ~/ -v
````


### Help
````sh
./src/converter.js -h
````

### ePub3 validation
the exported file could pass validation check on https://draft2digital.com/book/epubcheck/upload

### Knowning issues
formatConfigurations -> backgroundOpacity not support

Sample ppub file missing metadata info
- does not contains book name
- does not contains cover.jpg
- Does not contain language
- Does not contains book-type
- Does not support published date
- Does not support modified date
- ToC is required for iBook
- font file issues