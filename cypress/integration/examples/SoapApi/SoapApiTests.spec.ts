
/// <reference types="cypress" />

declare var require: NodeRequire;
describe('API Suite for SOAP calls', () => 
{
    context('Calculator API', () => 
    {
       it('Invoke ADD', () => 
       {
           // Read the Input XML template file
           cy.readFile('cypress/integration/examples/SoapApi/RequestXMLs/Request_Add.xml', 'utf-8').then(text =>
            {
               // Use XmlDOM to parse the file read and modify the xml Elements
               var DOMParser = require('xmldom').DOMParser;
               var reqDocXml = new DOMParser().parseFromString(text);
               reqDocXml.getElementsByTagName("tem:intA")[0].textContent = '2';
               reqDocXml.getElementsByTagName("tem:intB")[0].textContent = '55';
               
              // Invoke REquest on the API to call Add with the modified xml as input
               cy.request(
                   {
                        method: 'POST',
                        url: 'http://www.dneonline.com/calculator.asmx',    
                        headers: {
                            'Content-Type': 'text/xml'  
                        },            
                        body: reqDocXml.toString()
                    }).then((response) => 
                    {
                        expect((<any>response).status).to.eq(200);
                        cy.log((<any>response).body);
                        // Get the Add Result and verify it (2 + 55 = 57)
                        var resDocXml = new DOMParser().parseFromString((<any>response).body);
                        expect(resDocXml.getElementsByTagName("AddResult")[0].textContent).to.eq('57');
                    })
           })
       })
    })
})