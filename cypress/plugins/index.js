const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')
const fs = require('fs')
const excelToJson = require('convert-excel-to-json');

module.exports = on => {
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
}
