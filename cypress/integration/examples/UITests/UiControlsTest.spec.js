/// <reference types="cypress" />
import AtmnPrac from '../../../support/UITests/PageObjects/AtmnPrac'

let jsonData;

context('Testing Controls on AutomationPractice', () => {

    before(function(){
        cy.fixture('SampleInput.json').then(function(data){
            jsonData = data
    })

    beforeEach( function() {
        cy.visit("https://www.rahulshettyacademy.com/AutomationPractice/");
        cy.log("Navigated to Practice Page!!")
        })
    })

    it('Test IO Text', () => {
        const pracPage = new AtmnPrac();

        // Set and Get Text
        pracPage.getInputTextBox().type('Test Input').wait(1000)
        pracPage.getInputTextBox().then(($txtbox) => {
            expect($txtbox).to.have.value('Test Input')
        })

        // Click on Hide to verify input control is not visible on page
        cy.get('#hide-textbox').click({ force: true })
        pracPage.getInputTextBox().attribute('style').should('contain', 'display: none;')
        pracPage.getInputTextBox().invoke('attr', 'style').should('contain', 'display: none;')
        pracPage.getInputTextBox().should('have.attr', 'style', 'display: none;')
        pracPage.getInputTextBox().then($text => {
            expect($text).to.have.attr('style', 'display: none;')
        })

        // Click on Show to verify control is visible
        cy.get('#show-textbox').click({ force: true })
        pracPage.getInputTextBox().then($text => {
            expect($text).to.have.attr('style', 'display: block;')
        })
    })

    it('Test CheckBox', () => {
        const pracPage = new AtmnPrac();
        cy.log('Traverse through all the options of the CB and check them')
        pracPage.getCheckBoxElements().each(($cb, index, $list) => {
            cy.wrap($cb).check().should('be.checked')
        })

        cy.log('Check an option based on the value \'option3\'')
        pracPage.getCheckBoxElements().check('option3')

        cy.log('Filters the list for \'option1\ and then uncheks the specified CB')
        pracPage.getCheckBoxElements().filter('[value=\'option1\']').uncheck().should('not.be.checked')
    })

    it('Test Select DDL', () => {
        // select by text
        cy.get('#dropdown-class-example').select('Option1')
        // select by value
        cy.get('#dropdown-class-example').select('option3')
    })

    it('Test Radio Button', () => {
        cy.get('#radio-btn-example input[type=\'radio\']').as('RadioButtonCollection')
        cy.get('@RadioButtonCollection').filter('[value=\'radio1\']').check().should('be.checked')
        cy.get('#radio-btn-example').contains('Radio3').find('input').check().should('be.checked')
    })

    it('Test Folating DDL', () => {
        cy.get('#autocomplete').as('DDL')
        cy.get('@DDL').type('tan').wait(1000)
        cy.get('.ui-menu-item-wrapper').contains('Tanzania').click()
    })

    // Mouse Hover for css property elements
    it('MouseHover', () => {
        cy.get('.mouse-hover .mouse-hover-content a:nth-child(1)').click({ force: true })
        cy.get('.mouse-hover .mouse-hover-content a:nth-child(2)').click({ force: true })
        //cy.get('.mouse-hover .mouse-hover-content a:nth-child(1)').invoke('show').should('be.visible')//contains('Reload').click()
    })

    // Invokes a custom command created in support>commands.js
    it('Read Table Data', () => {
        cy.ReadDataFromTable('#product tbody tr', 8, 'Course').then(res => {
            cy.log("Table Data for 8th Row, Course Column : " + res)
        })
    })

    it('Interact with iFrames', () => {
        cy.GetIFrameBody('#courses-iframe').as('iframe')
        cy.get('@iframe').find('.header-upper .main-menu div:nth-child(2) ul').contains('Practice Projects').click()
        cy.get('@iframe').xpath('//h2[contains(text(),\'Join now to Practice\')]').should('be.visible')
    })

    it('Accessing Fixtures', function () {
        cy.log("Printing Prop1 : " + jsonData.Prop1)
        cy.log("Printing Prop2 : " + jsonData.Prop2)
        cy.log("Printing Prop3 : " + jsonData.Prop3)
    })

})
