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
    //pracPage.handleNewWindow('http://www.qaclickacademy.com/');
})

})


describe('File Download/Upload', {tags : ['@FileUpldDownld','@common']}, () => {   
    
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
    })

    it('Open Consulting Link on IFrame', () => {
        
       cy.frameLoaded('#courses-iframe')
       cy.enter('#courses-iframe').then(body => {
        body().xpath("//a[@href='/consulting']").click();
       })
       cy.wait(5000)
       cy.frameLoaded('#courses-iframe')
       cy.enter('#courses-iframe').then(body => {
        body().xpath("//form[@id='consultingForm']//input[@id='username']").scrollIntoView().type('Rupam');
        body().xpath("//form[@id='consultingForm']//input[@id='mobileno']").type('987643217');
        body().xpath("//form[@id='consultingForm']//input[@id='email']").type('test@mns.com');
        body().xpath("//form[@id='consultingForm']//textarea[@id='requirements']").scrollIntoView().type('Dummy Requirements');
        body().xpath("//form[@id='consultingForm']//select[@id='programming-language']").scrollIntoView().select('Javascript');
        body().xpath("//form[@id='consultingForm']//select[@id='timezone']").scrollIntoView().select('(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi');
        body().xpath("//form[@id='consultingForm']//button[text()='Send Message']").scrollIntoView().click();
        cy.wait(5000)
    })
    cy.frameLoaded('#courses-iframe')
    cy.enter('#courses-iframe').then(body => {
        body().xpath("//div[@class='modal-footer']//button").should('be.visible').click()
    })

    })
})