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
   
    pracPage.handleNewTab();
    pracPage.handleNewWindow('http://www.qaclickacademy.com/');
})

})


describe('File Download/Upload', () => {

    describe('Example to demonstrate file download in cypress', function () {

        it('File Download using cypress-downloadfile npm package', () => {
            cy.downloadFile('https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt',
                'cypress/fixtures/Download', 'test.txt')
            cy.readFile('cypress/fixtures/Download/test.txt').should('contain', 'Lorem ipsum dolor sit amet')    
        })
    })
})