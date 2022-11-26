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