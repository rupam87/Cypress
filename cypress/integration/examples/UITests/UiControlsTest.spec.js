/// <reference types="cypress" />
///<reference types="cypress-iframe" /> 


context('Testing Controls on AutomationPractice', ()=>{

beforeEach(()=>{
    cy.visit("https://www.rahulshettyacademy.com/AutomationPractice/");
    cy.log("Navigated to Practice Page!!")
})

it('Test IO Text', () =>{
// Set and Get Text
cy.get('#displayed-text').as('TextBox')
cy.get('@TextBox').type('Test Input').wait(1000)

cy.get('@TextBox').then(($txtbox) => { 
    expect($txtbox).to.have.value('Test Input')
})

// Click on Hide to verify input control is not visible on page
 cy.get('#hide-textbox').click({force: true})
 cy.get('@TextBox').attribute('style').should('contain','display: none;')
 cy.get('@TextBox').invoke('attr','style').should('contain','display: none;')
 cy.get('@TextBox').should('have.attr','style','display: none;')
 cy.get('@TextBox').then($text => {
    expect($text).to.have.attr('style','display: none;')
 })

 // Click on Show to verify control is visible
 cy.get('#show-textbox').click({force: true})
 cy.get('@TextBox').then($text => {
    expect($text).to.have.attr('style','display: block;')
 }) 
})

it('Test CheckBox', () => {
    cy.get('input[type=\'checkbox\']').as('checkboxElements')
    cy.log('Traverse through all the options of the CB and check them')
    cy.get('@checkboxElements').each(($cb, index, $list) =>{
        cy.wrap($cb).check().should('be.checked')        
    })

    cy.log('Check an option based on the value \'option3\'')
    cy.get('@checkboxElements').check('option3')

    cy.log('Filters the list for \'option1\ and then uncheks the specified CB')
    cy.get('@checkboxElements').filter('[value=\'option1\']').uncheck().should('not.be.checked')
    })

it('Test Select DDL', () =>{
    // select by text
    cy.get('#dropdown-class-example').select('Option1')
    // select by value
    cy.get('#dropdown-class-example').select('option3')
})

it('Test Radio Button', ()=>{
    cy.get('#radio-btn-example input[type=\'radio\']').as('RadioButtonCollection')
    cy.get('@RadioButtonCollection').filter('[value=\'radio1\']').check().should('be.checked')    
    cy.get('#radio-btn-example').contains('Radio3').find('input').check().should('be.checked')
})

it('Test Folating DDL', () =>{
    cy.get('#autocomplete').as('DDL')
    cy.get('@DDL').type('tan').wait(1000)
    cy.get('.ui-menu-item-wrapper').contains('Tanzania').click()
})

it('MouseHover', ()=>{
    cy.get('#mousehover').trigger('mouseover')
    cy.get('.mouse-hover>.mouse-hover-content>a').contains('Reload').click()
    cy.get('#mousehover').trigger('mouseover')
    cy.get('.mouse-hover>.mouse-hover-content>a').contains('Top').click()
})

it('Read Table Data', ()=>{
    cy.log(cy.ReadDataFromTable('#product>tbody>tr',8,'Course'))
})

})

