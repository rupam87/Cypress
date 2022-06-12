class PracticePage{

elements = {
    radioBtnLabel: (label)=> cy.xpath("//div[@id='radio-btn-example']//label").contains(label),
    countriesInput: () => cy.xpath("//input[@id='autocomplete']"),
    selectCountry: (country) => cy.xpath("//ul[@id='ui-id-1']//li/div[contains(text(),'"+country+"')]"),
    selectDropDown: () => cy.xpath("//select[@id='dropdown-class-example']"),
    checkBoxContainingText: (label) => cy.xpath("//div[@id='checkbox-example']//label").contains(label),
    nameTextBox: () => cy.xpath("//input[@id='name']"),
    alertBtn: () => cy.xpath("//input[@id='alertbtn']"),
    confirmBtn: () => cy.xpath("//input[@id='confirmbtn']"),
    openNewTabBtn: () => cy.get('fieldset>a#opentab'),
    openNewWinBtn: () => cy.xpath(".//button[@id='openwindow']")
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
    this.elements.openNewTabBtn().invoke('removeAttr','_target');
    this.elements.openNewTabBtn().click();
    cy.url().should('be.eq','https://www.rahulshettyacademy.com/'  )
    cy.xpath(".//div[contains(@class,'header-text')]//h2/span").invoke('attr','outerText').should('contain','An Academy to Learn Earn & Shine  in your QA Career')
}

handleNewWindow(){

}

}

export default PracticePage;