class CartSummaryPage{
    
    getUrl(){
        return '/index.php?controller=order'
    }
    
    getSummaryTable()
    {
        return cy.get('#cart_summary')
    }

    proceedToCheckoutButton()
    {
        return cy.get('.cart_navigation a[title=\'Proceed to checkout\']')
    }

    proceedToCheckoutAddrButton()
    {
        return cy.get('button[name=\'processAddress\']')
    }

    proceedToCheckoutShipButton()
    {
        return cy.get('button[name=\'processCarrier\']')
    }

    termsConditionsCB()
    {
        return cy.get('#cgv') 
    }

    payByWire()
    {
        return cy.get('.bankwire') 
    }
    
    confirmOrderButton()
    {
        return cy.get('#cart_navigation .button[type=\'submit\']') 
    }

    confirmedOrder()
    {
        return cy.get('#order-confirmation .box')
    }
}

export default CartSummaryPage;