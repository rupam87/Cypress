/// <reference types="cypress" />
import LandingPage from '../../../support/UITests/PageObjects/AutomationPractice/LandingPage';
import HomePage from '../../../support/UITests/PageObjects/AutomationPractice/HomePage';
import MyAccHomePage from '../../../support/UITests/PageObjects/AutomationPractice/MyAccHomePage';
import ShoppingCartSummaryPage from '../../../support/UITests/PageObjects/AutomationPractice/ShoppingCartSummaryPage';

let inputJsonData;
let hpage = new HomePage();
let lPage = new LandingPage();
let macHomePage = new MyAccHomePage();
let cartSummaryPage = new ShoppingCartSummaryPage();

describe('E2E e-Commerce Checkout Flow', () => {

    before(function () {
        Cypress.config('pageLoadTimeout', 60000)
        cy.fixture('AutomationPracticeInputs.json').then(function (data) {
            inputJsonData = data;
        })
        lPage.goToPage();
    })

    it('Checkout TShirts', () => {
        // Log in 
        lPage.signInLink().click()
        cy.url().should('include', hpage.getUrl())
        hpage.emailTxtField().type(inputJsonData.email)
        hpage.pwdTxtField().type(inputJsonData.password)
        hpage.submitLoginButton().click()

        // Add T-shirts to cart
        cy.url().should('include', macHomePage.getUrl())
        macHomePage.tShirtsElement().click()
        cy.url().should('include', '/index.php?id_category=5&controller=category')
        macHomePage.addToCart('1').click({ force: true })
        macHomePage.proceedToCheckoutButton().click({ force: true })

        // Verify Prod Name contains 'T-shirts' in summary table
        cy.url().should('include', cartSummaryPage.getUrl())
        cy.GetRows('#cart_summary').should('have.length', '1')
        cy.GetRow('#cart_summary', '1').GetCellFromRow('Description').find('.product-name a').text().should('include', 'T-shirts')

        // Add 1 to the Qty. Here we need to visit the href attribute as the click inturn invokes the url
        // and cypress does not wait for page to load before equating value in next call.
        cy.GetRow('#cart_summary', '1').GetCellFromRow('Quantity').find('.cart_quantity_button .button-plus').attribute('href').then( url =>
            cy.visit(url))

        // Verify Qty = 2
        cy.GetRow('#cart_summary', '1').GetCellFromRow('Quantity').find('.cart_quantity_input').invoke('attr','value').should('contain','2')
        // Click on Checkout
        cartSummaryPage.proceedToCheckoutButton().click()

        // Click on Checkout in Address page
        cartSummaryPage.proceedToCheckoutAddrButton().click()

        // Check Terms&Conditions and checkout in Shipping page 
        cartSummaryPage.termsConditionsCB().check().should('be.checked')
        cartSummaryPage.proceedToCheckoutShipButton().click()

        // Select Pay By Wire and Confirm Payment
        cartSummaryPage.payByWire().click()
        cartSummaryPage.confirmOrderButton().click()

        cartSummaryPage.confirmedOrder().invoke('prop','innerText').should('include','Your order on My Store is complete.')

    })

})