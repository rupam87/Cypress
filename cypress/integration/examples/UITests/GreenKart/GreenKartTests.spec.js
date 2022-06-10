/// <reference types="cypress" />

import GKLandingPage from '../../../../support/UITests/PageObjects/GreenKartApplication/GKLandingPage';

let gKartLandingPg = new GKLandingPage();



describe('GreenKart Application UI Test Suite', () =>{

    // Will run before each test within this suite is run
    beforeEach(()=>{
       
        cy.log("Application Url Retrieved: " + Cypress.env('qa').app_url);
        
        cy.visit(Cypress.env('qa').app_url);
        cy.injectAxe();
        cy.checkA11y(null,null,null,true);

        cy.log("TargetEnvToRun: " + Cypress.env('TargetEnvToRun'));
        cy.wait(5000);
        let app_url = Cypress.env(Cypress.env('TargetEnvToRun')).app_url;
        cy.log("Application Url Retrieved: " + app_url);
        cy.visit(app_url);

    })

    // Test with Grep tags and retries for execution.
    it('Checkout Veggies',{
        tags: ['@reg','@smoke','@test1'],
        retries: {
            runMode: 1,
            openMode: 0
        } 
            }, () => {
       gKartLandingPg.searchItem('on');
        cy.wait(1000)
        
// Add 3 Qty for Onions
gKartLandingPg.addItemsToCart('Onion','3')

// Clear the search to display all results
cy.get('form.search-form > input.search-keyword').clear(true).type('c');
cy.get('form.search-form > button.search-button').click();
cy.wait(1000);

// Add 5 Qty for Cashews
gKartLandingPg.addItemsToCart('Cashews','6')

// Verify Cart Details
gKartLandingPg.verifyCart('2',null)
        
    })

    // Sepcify Run Tags and browser for the test case.
    it('Add Itmms to Cart using Buttons and Match Value',{tags: ['@smoke', '@test2'], browser : 'chrome'}, () => {
        gKartLandingPg.searchItem('to');
        cy.wait(1000);
        gKartLandingPg.addItemsToCartUsingBtns('Potato','5')

    })
})


