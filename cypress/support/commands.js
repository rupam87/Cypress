// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-wait-until';
import "cypress-localstorage-commands";
require('cypress-downloadfile/lib/downloadFileCommand');
import 'cypress-file-upload';

// Reads Specific cell data from Table given paramters - TableHeaderId, Row Number (int) and ColHeaderName
Cypress.Commands.add('ReadDataFromTable', (tableHeadersId, rowNum, headerName) => {
  cy.get(tableHeadersId + ":nth-child(1)").contains(headerName).then(function (header) {
    cy.wrap(header).invoke('index').should('be.greaterThan', -1)
    cy.wrap(header).invoke('index').then((idx) => {
      // Get to the row and then the col and get the text
      return cy.get(tableHeadersId).eq(rowNum).find('td').eq(idx).text()
    })
  })
})

// Iframe Helper - returns the body DOM element from the IFrame (Must be within same domain)
Cypress.Commands.add('GetIFrameBody', (frameSel) => {
  cy.xpath(frameSel).then($frame => {
    return $frame.contents().find('body')
  })
})

Cypress.Commands.add('GetRows', (tableSel) => {
  return cy.get(tableSel).find('tbody tr')
})

Cypress.Commands.add('GetRow', (tableSel, rowNum) => {
  return cy.get(tableSel).find('tbody tr:nth-child(' + rowNum + ')')
})

Cypress.Commands.add('GetCellFromRow', (colName) => {
  return cy.get('td.cart_' + colName.toLowerCase())
})

Cypress.Commands.add('GetCellValue', (fileName, rowNum, colName) => {
  cy.task('getExcelAsJSON', fileName,{ timeout: 5000 }).then(contentsAsJson => {
    //cy.log(JSON.stringify(contentsAsJson.Sheet1[rowNum]));
      return JSON.stringify(contentsAsJson.Sheet1[rowNum]);
  })
})
