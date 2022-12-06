const SEARCH_RESET_BUTTON = 'button.SearchInput__Reset'
const SEARCH_INPUT_SELECTOR = '.SearchInput input'
const LOCATION_BUTTON_SELECTOR = 'button.LocationContainer'

describe('Search Page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.clearSessionStorage()

    cy.goToHomepage().openMenu()
  })

  it('should be able to clear value in ZIP/Address input', () => {
    cy.getWidgetIframe().find(SEARCH_RESET_BUTTON).click()
    cy.getWidgetIframe().find(SEARCH_INPUT_SELECTOR).should('have.value', '')
  })

  describe('Search Input and List', () => {

    beforeEach(() => {
      // Clear seach input
      cy.getWidgetIframe().find(SEARCH_RESET_BUTTON).click()
      cy.getWidgetIframe().find(SEARCH_INPUT_SELECTOR).should('have.value', '')
    })

    it('should re-order list based on ZIP code search', () => {
      const zipCode = '84003'
      const expectedTopResult = 'Scoreboard Sports - Orem'

      cy.getWidgetIframe().find(SEARCH_INPUT_SELECTOR).type(zipCode).should('have.value', zipCode)
      cy.wait(1500)

      cy.getWidgetIframe().find(LOCATION_BUTTON_SELECTOR).first().find('.LocationContainer__Name').should('have.text', expectedTopResult)
    })

    it('should re-order list based on address search', () => {
      const address = '765 West State Road'
      const expectedTopResult = 'Scoreboard Sports - Orem'

      cy.getWidgetIframe().find(SEARCH_INPUT_SELECTOR).type(address).should('have.value', address)
      cy.wait(1500)

      cy.getWidgetIframe().find(LOCATION_BUTTON_SELECTOR).first().find('.LocationContainer__Name').should('have.text', expectedTopResult)
    })

    it('selecting location should navigate to the correct location', () => {
      const locationName = 'Scoreboard Sports - Bountiful'
      cy.getWidgetIframe().find(LOCATION_BUTTON_SELECTOR).contains(locationName).click()
      cy.getWidgetIframe().find('.SendSmsPage__HeaderContainer').contains(locationName).should('be.visible')
    })
  })

})
