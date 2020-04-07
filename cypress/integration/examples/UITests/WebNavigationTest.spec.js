/// <reference types="cypress" />


describe('UI Tests', ()=> {

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })      

    context('TOI Tests', ()=>{
        
      before(() => {
        cy.clearLocalStorageSnapshot();
        cy.log('clearLocalStorageSnapshot executed!!')
        });

       beforeEach(() => {
        cy.viewport(1400,800)
        cy.restoreLocalStorage();
        cy.log('restoreLocalStorage executed!!')
        cy.visit("https://timesofindia.indiatimes.com/") 
        //cy.waitUntil(()=> cy.xpath('.//a[@class="clickhere"]')).should('be.visible')
        //cy.xpath('.//a[@class="clickhere"]').click({force: true})
        cy.waitUntil(()=> cy.url().should('eq','https://timesofindia.indiatimes.com/'))
       })

       afterEach(() => {
        cy.saveLocalStorage();
        cy.log('saveLocalStorage executed!!')
       });

       after(() =>{
           cy.removeLocalStorage("item")
           cy.log('removeLocalStorage executed!!')
       })

       it('Validate Header in TOI', () => { 
        cy.setLocalStorage("item","ValueOfTest1")
        cy.log('STEP 1')
        cy.log('setLocalStorage executed!!')

        cy.log('STEP 2')
        cy.waitUntil(() => cy.xpath('.//div[@class="top-story"]/h2[@class="hd1"]').should('have.text','TOP NEWS STORIES') )
        cy.log('STEP 3')
        cy.get('h1>a').find('img').first().click({force: true})
        
        // Using then to use HtmlElement as return value
        /*cy.xpath('.//a[@class="clickhere"]').then(($ele1)=>{
            cy.waitUntil(()=> cy.wrap($ele1).should('be.visible'))
            cy.wrap($ele1).click({force: true})
        })
        cy.log('STEP 4') */

        cy.log('STEP 4')
        cy.waitUntil(()=> cy.url().should('eq','https://timesofindia.indiatimes.com/'))
        cy.log('STEP 5')
        cy.get('h1>a>img').attribute('title').should('contain','News')
        cy.log('STEP 6')
        cy.xpath('.//div[@class="top-story"]/h2[@class="hd1"]').should('have.text','TOP NEWS STORIES') 
        })

        it('Traverse City->Kolkata->Crime', () => {
            cy.getLocalStorage("item").should('eq','ValueOfTest1')
            cy.log('getLocalStorage executed!!')

            cy.xpath('.//nav[@id="main-nav"]//li[@class="nav-City"]/a').click({force: true})
            cy.waitUntil(()=> cy.url().should('eq','https://timesofindia.indiatimes.com/city'))
            cy.xpath('.//nav[@id="main-nav"]//a[@href="/city/kolkata"]').click({force: true})
            cy.waitUntil(()=> cy.url().should('eq','https://timesofindia.indiatimes.com/city/kolkata'))

            // Using Alias (only works with get call)
            cy.get('.nav-Crime > a').as('CrimeLink')
            cy.get('@CrimeLink').should('be.visible')
            cy.get('@CrimeLink').click({force:true})     
            cy.waitUntil(()=> cy.xpath('.//span[text()="Kolkata Crime News"]').should('have.text','Kolkata Crime News'))               
        })
    })
})