const SEND_BUTTON_INCOMPLETE = '.SendButton--incomplete'
const SEND_BUTTON_INVALID = '.SendButton--invalid'
const SEND_BUTTON_VALID = '.SendButton--valid'

const [NAME_SELECTOR, NAME_INPUT, NAME_EXPECTED_VALUE] = ['#Name', 'Testing', 'Testing']
const [PHONE_SELECTOR, PHONE_INPUT, PHONE_EXPECTED_VALUE]= ['input[type="tel"]', '8018887777', '(801) 888-7777']
const [MESSAGE_SELECTOR, MESSAGE_INPUT, MESSAGE_EXPECTED_VALUE]= ['#Message', 'Test Message', 'Test Message']


describe('Form Page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.clearSessionStorage()

    cy.goToHomepage()
      .openMenu()

    // Select first location
    cy.getWidgetIframe().find('button.LocationContainer')
      .first()
      .find('.LocationContainer__Name')
      .click()
  })

  describe('Name Input', () => {
    it('should not be able to submit form when name is not provided', () => {
      cy.getWidgetIframe().find(PHONE_SELECTOR).clear().type(PHONE_INPUT).should('have.value', PHONE_EXPECTED_VALUE)
      cy.getWidgetIframe().find(MESSAGE_SELECTOR).clear().type(MESSAGE_INPUT).should('have.value', MESSAGE_EXPECTED_VALUE)

      cy.getWidgetIframe().find(SEND_BUTTON_INCOMPLETE).should('be.visible').click()
      cy.getWidgetIframe().contains('Name is required').should('be.visible')
    })

    it('should not be able to submit name which exceeds 50 character limit', () => {
      const longNameInput = 'qwfpbjluyarstneiozxcdvkhqwfpjluyarstneozaxcdkharsti' // 51 characters long
      cy.getWidgetIframe().find(PHONE_SELECTOR).clear().type(PHONE_INPUT).should('have.value', PHONE_EXPECTED_VALUE)
      cy.getWidgetIframe().find(MESSAGE_SELECTOR).clear().type(MESSAGE_INPUT).should('have.value', MESSAGE_EXPECTED_VALUE)

      cy.getWidgetIframe().find(NAME_SELECTOR).clear().type(longNameInput).should('have.value', longNameInput)

      cy.getWidgetIframe().find(SEND_BUTTON_VALID).should('be.visible').click()
      cy.getWidgetIframe().contains('Name is too long').should('be.visible')
      cy.getWidgetIframe().find(SEND_BUTTON_INVALID).should('be.visible')
    })
  })

  describe('Message Input', () => {
    const CHAR_COUNT_SELECTOR = '.message-char-count'

    beforeEach(() => {
      cy.getWidgetIframe().find(MESSAGE_SELECTOR).clear()
    })

    it('should not be able to submit form when message is not provided', () => {
      cy.getWidgetIframe().find(NAME_SELECTOR).clear().type(NAME_INPUT).should('have.value', NAME_EXPECTED_VALUE)
      cy.getWidgetIframe().find(PHONE_SELECTOR).clear().type(PHONE_INPUT).should('have.value', PHONE_EXPECTED_VALUE)

      cy.getWidgetIframe().find(SEND_BUTTON_INCOMPLETE).should('be.visible').click()
      cy.getWidgetIframe().contains('Message is required').should('be.visible')
    })

    it('should show correct char count near message boundry', () => {
      const longMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in atrtf'

      cy.getWidgetIframe().find(NAME_SELECTOR).clear().type(NAME_INPUT).should('have.value', NAME_EXPECTED_VALUE)
      cy.getWidgetIframe().find(PHONE_SELECTOR).clear().type(PHONE_INPUT).should('have.value', PHONE_EXPECTED_VALUE)
      cy.getWidgetIframe().find(MESSAGE_SELECTOR).clear().type(longMessage).should('have.value', longMessage)

      // Create array containing alphabet (because we only want to type one char at a time)
      const alpha = Array.from(Array(26).keys()).map((e, i) => i + 65)
      const alphabet = alpha.map((x) => String.fromCharCode(x));

      alphabet.map((char, index) => {
        cy.getWidgetIframe().find(MESSAGE_SELECTOR).type(char)
        cy.getWidgetIframe().find(CHAR_COUNT_SELECTOR).should('have.text', 20-index)
      })
    })

    it('should not be able to submit message which exceeds limit of 300 characters', () => {
      const longMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cilliu'

      cy.getWidgetIframe().find(NAME_SELECTOR).clear().type(NAME_INPUT).should('have.value', NAME_EXPECTED_VALUE)
      cy.getWidgetIframe().find(PHONE_SELECTOR).clear().type(PHONE_INPUT).should('have.value', PHONE_EXPECTED_VALUE)

      cy.getWidgetIframe().find(MESSAGE_SELECTOR).clear().type(longMessage).should('have.value', longMessage)
      cy.getWidgetIframe().find(CHAR_COUNT_SELECTOR).should('have.text', '-1')
      cy.getWidgetIframe().find(SEND_BUTTON_VALID).should('be.visible').click()
      cy.getWidgetIframe().contains('Message limit of 300 characters').should('be.visible')
      cy.getWidgetIframe().find(SEND_BUTTON_INVALID).should('be.visible')
    })
  })

  describe('Phone Number', () => {
    it('should not be able to submit form when phone number is not provided', () => {
      cy.getWidgetIframe().find(NAME_SELECTOR).clear().type(NAME_INPUT).should('have.value', NAME_EXPECTED_VALUE)
      cy.getWidgetIframe().find(MESSAGE_SELECTOR).clear().type(MESSAGE_INPUT).should('have.value', MESSAGE_EXPECTED_VALUE)

      cy.getWidgetIframe().find(SEND_BUTTON_INCOMPLETE).should('be.visible').click()
      cy.getWidgetIframe().contains('Mobile phone is required').should('be.visible')
    })

    it('should receive error when phone number is not valid (cannot recieve texts)', () => {
      cy.getWidgetIframe().find(NAME_SELECTOR).clear().type(NAME_INPUT).should('have.value', NAME_EXPECTED_VALUE)
      cy.getWidgetIframe().find(MESSAGE_SELECTOR).clear().type(MESSAGE_INPUT).should('have.value', MESSAGE_EXPECTED_VALUE)

      cy.getWidgetIframe().find(PHONE_SELECTOR).clear().type('801888777777777').should('have.value', '801888777777777')
      cy.getWidgetIframe().find(SEND_BUTTON_VALID).should('be.visible').click()
      cy.getWidgetIframe().contains('Please enter a phone number that can receive texts.').should('be.visible')
    })

    it('should not be able to enter non-numerical character in phone input', () => {
      cy.getWidgetIframe().find(NAME_SELECTOR).clear().type(NAME_INPUT).should('have.value', NAME_EXPECTED_VALUE)
      cy.getWidgetIframe().find(MESSAGE_SELECTOR).clear().type(MESSAGE_INPUT).should('have.value', MESSAGE_EXPECTED_VALUE)

      cy.getWidgetIframe().find(PHONE_SELECTOR).clear().type('801adc888def,,.77.o:77').should('have.value', PHONE_EXPECTED_VALUE)

      cy.getWidgetIframe().find(SEND_BUTTON_VALID).should('be.visible').click()
    })
  })

  it('should be able to submit form when valid input is provided', () => {

    cy.getWidgetIframe().find(NAME_SELECTOR).clear().type(NAME_INPUT).should('have.value', NAME_EXPECTED_VALUE)
    cy.getWidgetIframe().find(PHONE_SELECTOR).clear().type(PHONE_INPUT).should('have.value', PHONE_EXPECTED_VALUE)
    cy.getWidgetIframe().find(MESSAGE_SELECTOR).clear().type(MESSAGE_INPUT).should('have.value', MESSAGE_EXPECTED_VALUE)
    cy.getWidgetIframe().find(SEND_BUTTON_VALID).should('be.visible')
  })
})
