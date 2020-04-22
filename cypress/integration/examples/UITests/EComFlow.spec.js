/// <reference types="cypress" />
import LandingPage from '../../../support/UITests/PageObjects/AutomationPractice/LandingPage';
import HomePage from '../../../support/UITests/PageObjects/AutomationPractice/HomePage';

let inputJsonData;
let hpage= new HomePage();
let lPage = new LandingPage();

describe('E2E e-Commerce Checkout Flow', ()=>{

before(function(){
    cy.fixture('AutomationPracticeInputs.json').then(function(data){
        inputJsonData = data;
    })    
    hpage.goToPage();
})

it('Checkout TShirts', ()=>{
    hpage.tShirtsElement().click()
})


})