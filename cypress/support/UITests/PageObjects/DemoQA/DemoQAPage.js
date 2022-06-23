
class DemoQAPage{
    
    commonPageElements = {        
        headingText: () => cy.xpath(".//div[@class = 'main-header']"),
        logoutBtn: () => cy.xpath(".//button[@id='submit' and text()='Log out']")
    }

    loginPage = {
        url: () => "https://demoqa.com/login",
        usernameTextBox: () => cy.xpath("//input[@id='userName']"),
        passwordTextBox: () => cy.xpath("//input[@id='password']"),
        loginBtn: () => cy.xpath(".//button[@id='login']")
    }

    profilePage = {
        url: () => "https://demoqa.com/profile",
        goToStoreBtn: () => cy.xpath(".//button[@id='gotoStore']"),
        deleteAccountBtn: () => cy.xpath(".//button[@id='submit' and text()='Delete Account']"),
        deleteAllBooksBtn: () => cy.xpath(".//button[@id='submit' and text()='Delete All Books']"),
        bookTitleLink: (name) => cy.xpath(".//div[@class='rt-td']//a[text()='"+name+"']"),
        bookAuthorName: (name) => cy.xpath(".//div[@class='rt-td']//a[text()='"+name+"']//ancestor::div[@role='gridcell']//following-sibling::div[1]"),
        bookPublisherName: (name) => cy.xpath(".//div[@class='rt-td']//a[text()='"+name+"']//ancestor::div[@role='gridcell']//following-sibling::div[2]"),
        deleteBookAction: (name) => cy.xpath(".//div[@class='rt-td']//a[text()='"+name+"']//ancestor::div[@role='gridcell']//following-sibling::div//span[@id='delete-record-u"),
        deleteBookOkBtn: () =>  cy.xpath(".//button[@id='closeSmallModal-ok']"),
        deleteBookCancelBtn: () =>  cy.xpath(".//button[@id='closeSmallModal-cancel']"),
        deleteBookModalText: () => cy.xpath(".//div[@class = 'modal-body']")
    }

    bookStorePage = {
        url: () => "https://demoqa.com/books",
        searchBox: () => cy.xpath("//input[@id='searchBox']"),
        selectBook: (name) => cy.xpath("//a[text()='"+name+"']")
    }

    bookPage = {
        url: () => "https://demoqa.com/books?book=",
        addToYourCollectionBtn: () => cy.xpath("//button[@id='addNewRecordButton' and text()= 'Add To Your Collection']"),
        booksAddedToCollText : () => "Book added to your collection."
    }

    waitForPageToLoad(pageTitle){
        this.commonPageElements.headingText().invoke('text').should('be.eq', pageTitle)
    }
}

export default DemoQAPage;