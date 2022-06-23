/// <reference types="cypress" />
import DemoQAPage from '../../../support/UITests/PageObjects/DemoQA/DemoQAPage';

let demoQaPage = new DemoQAPage();

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})

describe('Login and select a book', {tags: ['@bookSelectionflow','@common']}, () => {

    beforeEach(()=>{
        cy.visit(demoQaPage.loginPage.url());
    })

    it('Add Programming JavaScript Applications to Collection', () =>{
        demoQaPage.loginPage.usernameTextBox().should('be.visible').type('demoqa');
        demoQaPage.loginPage.passwordTextBox().type('Demoqa1!');
        demoQaPage.loginPage.loginBtn().click();
        demoQaPage.waitForPageToLoad('Profile');
        demoQaPage.profilePage.goToStoreBtn().click();
        demoQaPage.waitForPageToLoad('Book Store');
        demoQaPage.bookStorePage.searchBox().type('Java');
        demoQaPage.bookStorePage.selectBook('Programming JavaScript Applications').click();
        cy.on('window:alert', (str) => {
            assert.equal(str,"Book added to your collection.");
        })
        cy.on('window:alert', () => true);
        demoQaPage.bookPage.addToYourCollectionBtn().should('be.visible').click(); // Invokes Alert Js
        demoQaPage.commonPageElements.logoutBtn().click()

    })

})