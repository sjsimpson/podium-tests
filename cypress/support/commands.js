// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const HOME_PAGE = 'https://demo.podium.tools/qa-webchat-lorw/'
const IFRAME_SELECTOR = 'iframe[data-cy="podium-website-widget-iframe"]'

Cypress.Commands.add('clearSessionStorage', () => {
  return cy.window().then((win) => {
    win.sessionStorage.clear()
  })
})

Cypress.Commands.add('getIframe', (iframeSelector) => {
    return cy
      .get(iframeSelector, { timeout: 2000 })
      .its('0.contentDocument.body')
      .should('be.visible')
      .then(cy.wrap)
})

Cypress.Commands.add('getWidgetIframe', () => {
  cy.get(IFRAME_SELECTOR)
    .its('0.contentDocument').should('not.be.empty')
    .its('body')
    .as('body')

  return cy.get('@body')
    .should('be.visible')
    .should('not.be.empty')
    .then(cy.wrap)
    // .find('div#ContactBubble', {timeout:10000})
})

Cypress.Commands.add('goToHomepage', () => {
  return cy.visit(HOME_PAGE)
})

Cypress.Commands.add('openMenu', () => {
  return cy.getWidgetIframe().find('button#podium-website-widget-button').click()
})

// Cypress.Commands.add('openMenu', () => {
//   cy.getIframeBody('iframe[data-cy="podium-website-widget-iframe"]').
// })
