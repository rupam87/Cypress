class HomePage {    
    
    getUrl(){
        return '/index.php?controller=authentication&back=my-account'
    }

    emailTxtField() {
        return cy.get('#email')
    }

    pwdTxtField() {
        return cy.get('#passwd')
    }

    submitLoginButton() {
        return cy.get('#SubmitLogin')
    }
}

export default HomePage;