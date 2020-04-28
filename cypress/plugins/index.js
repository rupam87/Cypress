const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')
const fs = require('fs')
const excelToJson = require('convert-excel-to-json');

module.exports = on => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)
  on('task', {
    getExcelAsJSON(xlsxFileName) {
      return excelToJson({
        sourceFile: xlsxFileName
      })
    }
  })
}
