/// <reference types="cypress" />
import PracticePage from '../../../support/UITests/PageObjects/AutomationPractice/PracticePage';

let pracPage = new PracticePage();

describe('AutomationPractice Test Suite', ()=>{
beforeEach(()=>{
    cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
})

it('Test All Controls', () => {
    pracPage.selectRadio('Radio2');
    pracPage.EnterAndSelectCountry('Brunei');
    pracPage.selectDropdownOptionAs('Option1');
    pracPage.selectCheckBox('Option3','check');
    pracPage.handleJSAlert('Rupam');
    pracPage.handleJSConfPopup('Rupam', 'ok');
    //pracPage.handleNewTab()
})

it('Test Windows and Tabs', () => {
   
    pracPage.handleJSAlert('Madhu');
    pracPage.handleJSConfPopup('Madhu', 'cancel');
    //pracPage.handleNewTab()
})

})


