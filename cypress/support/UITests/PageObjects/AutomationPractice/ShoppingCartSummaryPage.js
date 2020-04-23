class CartSummaryPage{
    
    getUrl(){
        return '/index.php?controller=order'
    }
    
    getSummaryTable()
    {
        return cy.get('#cart_summary')
    }

}

export default CartSummaryPage;