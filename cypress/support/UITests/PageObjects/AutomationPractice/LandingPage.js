class LandingPage{

signInLink()
{
   cy.get('.header_user_info .login').should('be.visible').then((obj)=>{
       return obj
   })
}

emailTxtField()
{
   cy.get('#email').should('be.visible').then((obj)=>{
       return obj
   })
}

pwdTxtField()
{
   cy.get('#passwd').should('be.visible').then((obj)=>{
       return obj
   })
}

submitLoginButton()
{
   cy.get('#SubmitLogin').should('be.visible').then((obj)=>{
       return obj
   })
}

}

export default LandingPage;