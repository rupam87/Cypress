# Devs
Repo for Automation

Look for folders inside 'cypress\integration\examples' to find API and UI tests.


Cypress Plugin dependencies :
===========================
"dependencies": {
	"convert-excel-to-json": "^1.6.1",
    "cypress": "^4.3.0",
    "cypress-commands": "^1.1.0",
    "cypress-localstorage-commands": "^1.1.7",
    "cypress-wait-until": "^1.6.1",
    "cypress-xpath": "^1.4.0",
    "ts-loader": "^6.2.2",
    "typescript": "^3.8.3",
    "webpack": "^4.42.1",
    "xmldom": "^0.3.0"
	}
"devDependencies": {
    "cypress": "^4.3.0",
    "@bahmutov/add-typescript-to-cypress": "^2.1.2",
    "@cypress/webpack-preprocessor": "^4.1.3",
    "@types/node": "^13.11.0"
  }

Enable TypeScript Support : 
=========================
Refer - https://github.com/bahmutov/add-typescript-to-cypress


Enable Support for XML Parsing from XML File :
==============================================
Install DomXml from - https://www.npmjs.com/package/xmldom

tsconfig.json  must include the below 
"compilerOptions": {
    "types": ["node"],
    "typeRoots": [ "../node_modules/@types" ]
}

Sample usage below :
declare var require: NodeRequire;
it('Invoke ADD', () => {   cy.readFile('cypress/../../Request_Add.xml','utf-8').then(text =>{
       cy.log(text);
       var DOMParser = require('xmldom').DOMParser;
       var doc = new DOMParser().parseFromString(text);
       doc.getElementsByTagName("tem:intA")[0].textContent = '2';
       doc.getElementsByTagName("tem:intB")[0].textContent = '55';
       cy.log(doc.toString()); });
       })

JSON Parsing in TypeScript from API response :
==============================================
it('Query url for name squirtle', () => 
    {         
        cy.request('GET','/api/v2/pokemon').then(response => 
        {
            var url = response.body.results.filter(f => f.name === 'squirtle')[0].url;
            cy.log("Url for Squirtel : "+ JSON.stringify(url));
            cy.request('GET',url).then((response) => 
            {
                cy.log("Printing all Abilities Results ==>");
                response.body.abilities.forEach(e => cy.log(e.ability));
                var url2 = response.body.game_indices.filter(a => a.version.name === 'white-2')[0].version.url;
                cy.log("Url for white-2 : "+ JSON.stringify(url2));
            })
        })        
    })


Excel Parsing Support
=====================
1. Install 'convert-excel-to-json' npm module
2. To be able to work with excels, we need to create Cypress Tasks.Otherwise the 'fs' module does not work with WebPack.
   Steps to create the task :
   1) cypress/plugins/index.js - open and the add the below imports : 
		const fs = require('fs')
		const excelToJson = require('convert-excel-to-json');
   2) Inside Module.Exports add the below task
         on('task', {
					getExcelAsJSON(xlsxFileName) {
					  return excelToJson({
						sourceFile: xlsxFileName
					  })
			}
	3) Use the task from your test : cy.task('getExcelAsJSON', 'cypress/../ReadFile.xlsx').then(result => {
            cy.log(JSON.stringify(result))
        })


RUN Cypress tests from cmd :
============================
C:\Cypress.io\Devs>node_modules\.bin\cypress run --record --key 10e834ca-e8dc-4dd3-a150-7ccf165fd15c --spec "cypress\integration\examples\**\*"