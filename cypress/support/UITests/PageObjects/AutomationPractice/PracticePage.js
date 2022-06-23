import { Assertion } from "chai";

class PracticePage{

elements = {
    headingText: () => cy.xpath(".//h1[text()='Practice Page']"),
    radioBtnLabel: (label)=> cy.xpath("//div[@id='radio-btn-example']//label").contains(label),
    countriesInput: () => cy.xpath("//input[@id='autocomplete']"),
    selectCountry: (country) => cy.xpath("//ul[@id='ui-id-1']//li/div[contains(text(),'"+country+"')]"),
    selectDropDown: () => cy.xpath("//select[@id='dropdown-class-example']"),
    checkBoxContainingText: (label) => cy.xpath("//div[@id='checkbox-example']//label").contains(label),
    nameTextBox: () => cy.xpath("//input[@id='name']"),
    alertBtn: () => cy.xpath("//input[@id='alertbtn']"),
    confirmBtn: () => cy.xpath("//input[@id='confirmbtn']"),
    openNewTabBtn: () => cy.get('fieldset>a#opentab'),
    openNewWinBtn: () => cy.xpath(".//button[@id='openwindow']"),
    coursesIframe: () => "//iframe[@id='courses-iframe']"
}

iframeElements = {
    iframeId_css: () => "#courses-iframe",
    consultingLink_xpath: () => "//a[@href='/consulting']",
    username_xpath: () => "//form[@id='consultingForm']//input[@id='username']",
    mobileno_xpath: () => "//form[@id='consultingForm']//input[@id='mobileno']",
    emailid_xpath: () => "//form[@id='consultingForm']//input[@id='email']",
    requirements_xpath: () => "//form[@id='consultingForm']//textarea[@id='requirements']",
    programmingDDL_xpath: () => "//form[@id='consultingForm']//select[@id='programming-language']",
    timezoneDDL_xpath: () => "//form[@id='consultingForm']//select[@id='timezone']",
    sendMsgBtn_xpath: () => "//form[@id='consultingForm']//button[text()='Send Message']",
    closeBtn_xpath: () => "//div[@class='modal-footer']//button"
}

selectRadio(option){
    this.elements.radioBtnLabel(option).xpath(".//input[@class='radioButton']").click()
}

EnterAndSelectCountry(name){
    this.elements.countriesInput().type(name);
    this.elements.selectCountry(name).should('be.visible').click()
}

selectDropdownOptionAs(option){
    this.elements.selectDropDown().select(option)
}

// selectCheckBox('cb1', 'true')
selectCheckBox(label, mode){
    if(mode == 'check')
        this.elements.checkBoxContainingText(label).xpath("input[@type='checkbox']").check()
    else
        this.elements.checkBoxContainingText(label).xpath("input[@type='checkbox']").uncheck()
}

handleJSAlert(name){
    this.elements.nameTextBox().type(name);
    // verify alert
    cy.on('window:alert', (str) => {
        assert.equal(str,"Hello " + name + ", share this practice page and share your knowledge");
    })
    cy.on('window:alert', () => true);
    this.elements.alertBtn().click();
}

handleJSConfPopup(name, option){
    this.elements.nameTextBox().type(name);
    // verify Confirmation pop up
    cy.on('window:confirm', (str) => {
        assert.equal(str, "Hello " + name + ", Are you sure you want to confirm?");
    })
    if(option == 'ok')
        cy.on('window:confirm', () => true);
    else
        cy.on('window:confirm', () => false);
        
    this.elements.confirmBtn().click();
    
}

handleNewTab(){
    cy.url().then(($currUrl)=>{
        this.elements.openNewTabBtn().invoke('removeAttr','target').click();
        cy.url().should('be.eq','https://www.rahulshettyacademy.com/')
        cy.xpath(".//div[contains(@class,'header-text')]//h2/span").invoke('prop','outerText').then((oText) => {
            var actStrippedTxt = (oText).replace(/ /g,'').toLowerCase();
            var expStrippedTxt = "An Academy to Learn Earn & Shine \u00a0 in your QA Career".replace(/ /g,'').toLowerCase();
            assert.equal(actStrippedTxt,expStrippedTxt);
        })        
        cy.go('back');
        cy.url().should('be.eq', $currUrl);
    })    
}

handleNewWindow(urlToOpen){
    // Stub the Window Object's Open function to open the 
    // given url when called.
    /* cy.window().then((win) => {
        cy.stub(win, 'open').callsFake(() => {
            win.location.href = urlToOpen;
        }).as("popup")
    }); */

    const stub = cy.stub().as('open')
    cy.on('window:before:load', (win) => {
        cy.stub(win, 'open').callsFake(stub)
    })

    // Clicking the new window btn on the app opens a new window
    // but we're calling the alias for the stubbed window object
    // to open the url in the same window
    this.elements.openNewWinBtn().click();
    cy.get('@popup').should("be.called");
    
}

}

export default PracticePage;