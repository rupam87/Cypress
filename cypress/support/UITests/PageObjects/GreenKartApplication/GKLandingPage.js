import { expect } from "chai";

class GKLandingPage{
    // Define and declare all the PO elements as functions under 1 property
    elements = {
        searchTextBox: () => cy.get('form.search-form > input.search-keyword'),
        searchButton: () => cy.get('form.search-form > button.search-button'),
        cartItemCount: () => cy.xpath("//div[@class='cart-info']//td[text()='Items']//parent::tr//strong"),
        cartTotalQty: () => cy.xpath("//div[@class='cart-info']//td[text()='Price']//parent::tr//strong"),
        productQtyInputBox: (value) => cy.xpath("//div[@class='products']//h4[contains(text(),'"+value+"')]//parent::div//input[@class='quantity']"),
        productPrice: (value) => cy.xpath("//div[@class='products']//h4[contains(text(),'"+value+"')]//parent::div//p[@class='product-price']"),
        addProductButton: (value) => cy.xpath("//div[@class='products']//h4[contains(text(),'"+value+"')]//parent::div//button"),
        productIncrementButton: (value) => cy.xpath("//div[@class='products']//h4[contains(text(),'"+value+"')]//parent::div//a[@class='increment']")    
    }

searchItem(item){
    this.elements.searchTextBox().should('be.visible').type(item);
    cy.screenshot();
    this.elements.searchButton().should('be.visible').click();
}

addItemsToCart(name,qty){
// type the Qty on Product
this.elements.productQtyInputBox(name).clear().type(qty);
this.elements.productPrice(name).click();
// verify Qty is set
this.elements.productQtyInputBox(name).should('have.attr', 'value', qty)
cy.screenshot();
// Add the product to the cart
this.elements.addProductButton(name).click();
}

addItemsToCartUsingBtns(name, qty){
    // by default value is set to 1 for each product hence looping for 1 less than Qty
    for(let i=1; i<qty; i++){
        this.elements.productIncrementButton(name).should('be.visible').click();
        // verify Qty is set
        this.elements.productQtyInputBox(name).should('have.attr', 'value', i+1);
    }
    // Add the product to the cart
    this.elements.addProductButton(name).click();
    
    this.elements.productPrice(name).then(($prc) =>{
        let unitprc = parseInt(($prc).text());
        let totalprc = unitprc * parseInt(qty)
        cy.log("Unit Price:" + ($prc).text() + " Quantity:" + qty + " and total Price:" + totalprc.toString())
        this.verifyCart('1', totalprc.toString());
    })
}

verifyCart(itemCount, expPrice){

    if(itemCount != null){
    // Validate Item Count
    this.elements.cartItemCount().should(($cnt) => {
        assert.equal($cnt.text().trim(), itemCount, "Cart Items Count Matched!");})
    }    

    if(expPrice != null){
    // Validate total Price
    this.elements.cartTotalQty().should(($price) => {
        assert.equal($price.text().trim(), expPrice, "Cart Price Matched!");})
    }

}

}

export default GKLandingPage;
