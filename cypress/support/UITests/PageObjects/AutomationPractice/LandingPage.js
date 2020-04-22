class LandingPage {

    goToPage() {
        return cy.visit('http://automationpractice.com/')
    }

    isPageLoaded() {
        return cy.wrap(cy.url()).should('include', '/index.php')
    }

    signInLink() {
        return cy.get('.header_user_info .login')
    }  

}

export default LandingPage;