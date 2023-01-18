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

// FIXME: remover esses comentários

// FIXTURE

Cypress.Commands.add('saveAtFixture', (file, value) => cy.writeFile(`cypress/fixtures/${file}.json`, value))
Cypress.Commands.add('loadFixture', (file) => cy.fixture(file))

// LOCALSTORAGE

Cypress.Commands.add('localStorageRemoveItem', (key) => localStorage.removeItem(key))
Cypress.Commands.add('localStorageGetItem', (key) => localStorage.getItem(key))
Cypress.Commands.add('localStorageSetItem', (key, value) => localStorage.setItem(key, value))

// LOGIN/LOGOUT

Cypress.Commands.add('login', () => cy.loadFixture('currentUser').then((data) => cy.localStorageSetItem('currentUser', JSON.strigify(data))))
Cypress.Commands.add('logout', () => cy.localStorageRemoveItem('currentUser'))

// EMAIL PASSWORD

Cypress.Commands.add('getPassword', () => {
  return cy.maildevGetLastMessage().then((message) => {
    const regex = /Senha : (.+?)<\/p>/i;
    const match = message.html.match(regex);
    const password = match[1].trim();
    return password;
  })
})
