
/// <reference types="cypress" />


describe('API Suite', () =>{    
      
context('Rest API on https://pokeapi.co/api/v2/pokemon', () =>{

beforeEach(()=>{
cy.request('GET','/api/v2/pokemon').as('GetPoke')
cy.log('inside API Suite')
})

    it('Get Call Invoke',() => {
        cy.get('@GetPoke').then((response) =>
        {      
            cy.log((<any>response).status)
            expect((<any>response).status).to.eq(200)
            expect((<any>response).body.results[0]).to.have.property('url')
            cy.log((<any>response).body.results[0].name)
            cy.log(JSON.stringify((<any>response).body))
        })
    })

    it('Query Json Respnose using LINQ Filters', () => {
        cy.get('@GetPoke').then((response) => 
        {
            cy.log("Printing all Results ==>");
            (<any>response).body.results.forEach(e => cy.log(e));
            cy.log("PRINTING DETAILS FOR CHARIZAD ==>");
            (<any> response).body.results.filter(f => f.name === 'charizard').forEach(e => cy.log(e));
            cy.log("PRINTING DETAILS FOR NAMES STARTING WITH 'b'  ==>");
            (<any>response).body.results.filter(n => n.name.startsWith("b")).forEach(e => cy.log(e))        
        });
    })  

    it('Query url for name squirtle', () => 
    {         
        cy.get('@GetPoke').then((response) => 
        {
            var url = (<any>response).body.results.filter(f => f.name === 'squirtle')[0].url;
            cy.log("Url for Squirtel : "+ JSON.stringify(url));
            cy.request('GET',url).then((response) => 
            {
                cy.log("Printing all Abilities Results ==>");
                (<any>response).body.abilities.forEach(e => cy.log(e.ability));
                var url2 = (<any> response).body.game_indices.filter(a => a.version.name === 'white-2')[0].version.url;
                cy.log("Url for white-2 : "+ JSON.stringify(url2));
            })
        })        
    })

})

})