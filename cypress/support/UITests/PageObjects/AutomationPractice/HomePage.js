class HomePage{

   goToPage()
   {
       cy.visit('http://automationpractice.com/');
       isPageLoaded();
   }

    isPageLoaded()
    {
        cy.waitUntil(()=>{
         cy.url().should('have.text','/index.php?controller=my-account')
        }, 
        {
          errorMsg: 'Wait for Home Page to load failed',
          timeout: 10000,
          interval:1000
        })        
    }

    tShirtsElement()
    {
       return cy.get('#block_top_menu .sf-menu.clearfix.menu-content.sf-js-enabled.sf-arrows > li:nth-child(3)')
    }
}

export default HomePage;