/// <reference types="cypress" />
import PracticePage from '../../../support/UITests/PageObjects/AutomationPractice/PracticePage';

let pracPage = new PracticePage();

describe('AutomationPractice Test Suite', {tags : ['@TestSuite1','@common']}, ()=>{
beforeEach(()=>{
    cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
    pracPage.elements.headingText().should('be.visible')
})

it('Test All Controls', {tags: ['@controls', '@test1'] },() => {
    pracPage.selectRadio('Radio2');
    pracPage.EnterAndSelectCountry('Brunei');
    pracPage.selectDropdownOptionAs('Option1');
    pracPage.selectCheckBox('Option3','check');
    pracPage.handleJSAlert('Rupam');
    pracPage.handleJSConfPopup('Rupam', 'ok');
})

it('Test Windows and Tabs', {tags: ['@WinTabs','@test2']} ,() => {
   
    pracPage.handleNewTab();
    pracPage.handleNewWindow('http://www.qaclickacademy.com/');
})

})


describe('File Download/Upload', {tags : ['@FileUpldDownld','@common']}, () => {   
    
    it('File Download using cypress-downloadfile npm package', {tags: '@FileDwnld'}, () => {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
        cy.downloadFile('https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt',
            'cypress/fixtures/Download', 'test.txt')
        cy.readFile('cypress/fixtures/Download/test.txt').should('contain', 'Lorem ipsum dolor sit amet')    
    })

    it('File Download using Button Click', {tags: '@FileDwnldBtn'}, () => {
        cy.visit('https://filesamples.com/formats/csv');
        cy.xpath(".//*[text()='sample1.csv']//parent::div//following-sibling::a").should('be.visible').click();
        cy.verifyDownload('sample1.csv', { timeout: 20000, interval: 500 })
    })

    it('File upload example', {tags:'@FileUpld'} , () => {
        cy.visit('https://practice.automationbro.com/cart/');
        cy.xpath(".//input[@type='button' and @value ='Select File']//following-sibling::input[@type='file']")
        .attachFile("Upload/Sunset.jpeg");

        cy.xpath(".//input[@type='button' and @value ='Upload File']").click();

        cy.xpath(".//label[text()='Uploading...']").should('be.visible');
        cy.xpath(".//label[@id='wfu_messageblock_header_1_label_1']").should('contain',"uploaded successfully");
    })
    
})

describe('Interact with Iframes', {tags: ['@IframeTests', '@common']}, () =>{

    beforeEach(()=>{
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
        pracPage.elements.headingText().should('be.visible')
        cy.log('Heading Text is visible');
        cy.GetIFrameBody(pracPage.elements.coursesIframe()).as('iframe')
    })

    it('Open Consulting Link on IFrame', () => {
        cy.get('@iframe').xpath(pracPage.elements.iframe_consultingArrow()).realHover({
            pointer: "mouse",
            position: "center",
            scrollBehavior: "center"
        }).click()
        
        cy.get('@iframe').xpath(".//h1[text()='Job Support']").should('exist')
    })
})