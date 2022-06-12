class HzLandingPage{

    elements = {
        pickUpLocTrigger : () => cy.xpath("//div[@id='resformStartTrigger']"),
        pickUpLocInput : () => cy.xpath("//input[@id='pickup-location']"),
        cityLabels : () => cy.xpath(".//div[@id='resformReflow']//div[@class='ww-results']//label[text()='City Locations']", { timeout: 10000 }),
        firstSearchedLoc : () => cy.xpath(".//div[@id='resformReflow']//div[@class='ww-results']//label[text()='City Locations']/following-sibling::div[1]/div[1]"),
        returnLocInput : () => cy.xpath("//input[@id='dropoff-location']"),
        pickUpDtBox : () => cy.xpath("//div[@id='pickup-date-box']"),
        pickUpTimeDDL : () => cy.xpath("//select[@name='pickupTime']"),
        returnDtBox : () => cy.xpath("//div[@id='dropoff-date-box']"),
        pickUpTimeDDL : () => cy.xpath("//select[@name='dropoffTime']"),
        bookAsGuestBtn : () => cy.xpath("//button[contains(text(),'Book as a Guest')]"),
        calendar: () => cy.xpath("//div[@class='calendar']"),
        calendarMonthYearText : (month_year) => cy.xpath("//div[@class='month dual']//h1[text()='"+month_year+"']"),
        calendarDate : (date, month_year) => cy.xpath("//div[@class='calendar']//div[@class='month dual']//h1[text()='"+month_year+"']/ancestor::div/table//td[text()='"+date+"']"),
        calendarNextArrow : () => xpath("//div[@class='calendar']//div[@class='month dual'][2]//span[@class='next arrow']")
    }

    // Date Select Helper
    SelectDate(date, month_year)
    {
        this.elements.calendar().should('be.visible');
        for(let i = 1; i<= 14; i++)
        {
            if( this.elements.calendarMonthYearText(month_year).its('length') > 0){
                // Select the date for the Month and Year matched
                this.elements.calendarDate(date,month_year).click()
                cy.log('Selected Date :' + date + month_year)
            }
            else{
                // Click on the Right Nav Icon to display next 2 months
                this.elements.calendarNextArrow().click();
                cy.log(month_year + ' is not displayed, clicked on right navigation link : ' + i)
            }
        }
    }    
}

export default HzLandingPage;