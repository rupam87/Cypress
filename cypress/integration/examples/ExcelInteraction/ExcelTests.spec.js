
describe('Interact with Excels', () => {


    it('Read Excel File', () => {
        //let result = excelToJson({
        //   sourceFile: './ExcelFiles/ReadFile.xlsx'
        // });

        cy.task('getExcelAsJSON', 'cypress/integration/examples/ExcelInteraction/ExcelFiles/ReadFile.xlsx').then(result => {
            cy.log(JSON.stringify(result))
        })
    })

})