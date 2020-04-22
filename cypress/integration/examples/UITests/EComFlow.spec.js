/// <reference types="cypress" />
import LandingPage from '../../../support/UITests/PageObjects/AutomationPractice/LandingPage';
import HomePage from '../../../support/UITests/PageObjects/AutomationPractice/HomePage';
import MyAccHomePage from '../../../support/UITests/PageObjects/AutomationPractice/MyAccHomePage';

let inputJsonData;
let hpage= new HomePage();
let lPage = new LandingPage();
let macHomePage = new MyAccHomePage();

describe('E2E e-Commerce Checkout Flow', ()=>{

before(function(){
    Cypress.config('pageLoadTimeout',60000)
    cy.fixture('AutomationPracticeInputs.json').then(function(data){
        inputJsonData = data;
    })    
    lPage.goToPage();
})

it('Checkout TShirts', ()=>{
    lPage.signInLink().click()
    cy.url().should('include', '/index.php?controller=authentication&back=my-account')
    hpage.emailTxtField().type(inputJsonData.email)
    hpage.pwdTxtField().type(inputJsonData.password)
    hpage.submitLoginButton().click()
    cy.url().should('include', '/index.php?controller=my-account')
    macHomePage.tShirtsElement().click()
    cy.url().should('include', '/index.php?id_category=5&controller=category')
    })

})