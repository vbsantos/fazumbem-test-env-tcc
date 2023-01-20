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

Cypress.Commands.add('login', () => cy.loadFixture('currentUser').then((data) => cy.localStorageSetItem('currentUser', JSON.stringify(data, null, 2))))
Cypress.Commands.add('getUserId', () => cy.loadFixture('currentUser').then((data) => data.user.idUser))
Cypress.Commands.add('logout', () => cy.localStorageRemoveItem('currentUser'))

// EMAIL PASSWORD

Cypress.Commands.add('setLoginData', (email, password) => {
  cy.writeFile(`cypress/fixtures/login.json`, { email, password })
})

Cypress.Commands.add('getLoginData', () => cy.fixture("login"))

Cypress.Commands.add('getLoginDataFromEmail', (message) => {
    const regexEmail = /Email : (.+?)<\/p>/i;
    const regexPassword = /Senha : (.+?)<\/p>/i;

    const matchEmail = message.html.match(regexEmail);
    const matchPassword = message.html.match(regexPassword);

    const email = matchEmail[1].trim();
    const password = matchPassword[1].trim();

    return { email, password };
})
