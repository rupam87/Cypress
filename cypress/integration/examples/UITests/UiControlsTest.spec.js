/// <reference types="cypress" />

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
 cy.log('style attrib value post hiding is: '+ cy.get('@TextBox').attribute('style'))
 cy.get('@TextBox').then($text => {
    expect($text).to.have.attr('style','display: none;')
 })

 // Click on Show to verify control is visible
 cy.get('#show-textbox').click({force: true})
 cy.get('@TextBox').then($text => {
    expect($text).to.have.attr('style','display: block;')
 })

})

})