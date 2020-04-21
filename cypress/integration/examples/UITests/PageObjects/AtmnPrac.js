class AtmnPrac{

getInputTextBox(){
    return cy.get('#displayed-text')
}

getCheckBoxElements(){
    return cy.get('input[type=\'checkbox\']')
}

}

export default AtmnPrac;