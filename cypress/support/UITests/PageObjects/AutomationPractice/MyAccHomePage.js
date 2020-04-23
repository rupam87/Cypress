class MyAccHomePage{

    getUrl(){
        return '/index.php?controller=my-account'
    }

    tShirtsElement() {
        return cy.get('#block_top_menu .sf-menu.clearfix.menu-content.sf-js-enabled.sf-arrows > li:nth-child(3)')
    }

    addToCart(index){
        return cy.xpath('//ul[@class=\'product_list grid row\']//li[' + index + ']//span[contains(text(),\'Add to cart\')]')
    }

    proceedToCheckoutButton(){
        return cy.xpath('//span[contains(text(),\'Proceed to checkout\')]')
    }
}

export default MyAccHomePage;