# Devs
Repo for Automation

Look for folders inside 'cypress\integration\examples' to find API and UI tests.

CYPRESS.io Set up

Cypress Plugins To Install :
===========================
 cypress-wait-until
 cypress-localstorage-commands
 cypress-xpath
 Cypress-commands

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
    { cy.get('@GetPoke').then((response) => 
        { var url = (<any>response).body.results.filter(f => f.name === 'squirtle')[0].url;
            cy.log("Url for Squirtel : "+ JSON.stringify(url));
            cy.request('GET',url).then((response) => 
            {
                cy.log("Printing all Abilities Results ==>");
                (<any>response).body.abilities.forEach(e => cy.log(e.ability));
                var url2 = (<any> response).body.game_indices.filter(a => a.version.name === 'white-2')[0].version.url;
                cy.log("Url for white-2 : "+ JSON.stringify(url2));
            })
        })        
    })
