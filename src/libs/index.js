module.exports = {
  extractPPubFile:        require('./extractPPubFile'),
  createEmptyEPUBFolder:  require('./createEmptyEPUBFolder'),
  parsepPubFile:          require('././parsepPPubData'),
  createPageXHTML:        require('./createPageXHTML'),
  createPageSMIL:         require('./createPageSMIL'),
  copyPageResourceFiles:  require('./copyPageResourceFiles'),
  updateContentOPF:       require('./updateContentOPF'),
  generateBookCSS:        require('./generateBookCSS'),
  generateFinalizedEPUB:  require('./generateFinalizedEPUB'),
  cleanupTempFiles:       require('./cleanupTempFiles'),
}