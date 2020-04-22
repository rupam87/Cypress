class HomePage {

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