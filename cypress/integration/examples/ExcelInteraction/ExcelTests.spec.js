
describe('Interact with Excels', () => {

    let fileName;
    before(() => {
        this.fileName = 'cypress/integration/examples/ExcelInteraction/ExcelFiles/ReadFile.xlsx';
    })

    it('Read Excel File', () => {
        
        cy.task('getExcelAsJSON', this.fileName, { timeout: 5000 }).then(contentsAsJson => {
            cy.log(JSON.stringify(contentsAsJson.Sheet1[3]));
            cy.log(JSON.stringify(contentsAsJson.Sheet1[3].C));
        })
    })
 

})