describe("Página 'Termos de uso'", () => {

  beforeEach(() => {
    cy.logout()
    cy.visit("/termo.html");
  })

  it("usuário não-autenticado deve conseguir ver a página 'Termos de uso'", () => {
    cy.url().should('include', "/termo")
  });
});
