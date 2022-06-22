//const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')
///const fs = require('fs')
//const excelToJson = require('convert-excel-to-json');

/*module.exports = on => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)
  on('task', {
    getExcelAsJSON(xlsxFileName) {
      return excelToJson({
        sourceFile: xlsxFileName,
        header:{
          // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
          rows: 1 
      }
      })
    }
  })
}*/

// cypress/plugins/index.js
module.exports = (on, config) => {
  // optional: register cypress-grep plugin code
  // https://github.com/cypress-io/cypress-grep
  require('cypress-grep/src/plugin')(config)
  // make sure to return the config object
  // as it might have been modified by the plugin
  return config
}

const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
module.exports = (on, config) => {
  on('task', {downloadFile})
};

const { isFileExist } = require('cy-verify-downloads');
module.exports = (on, config) => {
  on('task', { isFileExist })
}