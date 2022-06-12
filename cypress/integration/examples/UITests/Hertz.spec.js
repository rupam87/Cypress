/// <reference types="cypress" />

import HzLandingPage from '../../../support/UITests/PageObjects/HertzRental/HzLandingPage';


let hertzLandingPg = new HzLandingPage();

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Hertz Tests', () => {

beforeEach(()=>{
cy.visit('https://www.hertz.com/rentacar/reservation/')
})

it('Book As Guest',()=>{
    hertzLandingPg.elements.pickUpLocTrigger().should('be.visible')
    hertzLandingPg.elements.pickUpLocTrigger().click()
    // Select Pickup Loc
    hertzLandingPg.elements.pickUpLocInput().type('Kolkata')
    //hertzLandingPg.elements.cityLabels().should('be.visible')
    hertzLandingPg.elements.firstSearchedLoc().click()
    // Select Return Loc
    hertzLandingPg.elements.returnLocInput().type("Bangalore")
    //hertzLandingPg.elements.cityLabels().should('be.visible')
    hertzLandingPg.elements.firstSearchedLoc().click()

    // Select Pickup/Return Date& Time
    hertzLandingPg.elements.pickUpDtBox().click()
    hertzLandingPg.elements.calendarDate('14','November 2022')
    hertzLandingPg.elements.returnDtBox().click()
    hertzLandingPg.elements.calendarDate('14','December 2022')

    hertzLandingPg.elements.bookAsGuestBtn().click()
})

})