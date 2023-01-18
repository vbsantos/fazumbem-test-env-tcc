describe("Login", () => {
  it("usuário deve ver uma mensagem de erro quando informa dados incorretos", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("vbsanttos@gmail.com");
    cy.get('input[name="password"]').type("12345678");

    cy.get("button[type='submit']").click();

    cy.get('[role="status"]').contains("Verifique seus dados e tente novamente");
  });

  it("usuário deve ser capaz de logar com sucesso", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("vbsanttos@gmail.com");
    cy.getPasswordFromEmail().then((passwordReceivedFromEmail) => {
      cy.get('input[name="password"]').type(passwordReceivedFromEmail);
    })
    cy.get("button[type='submit']").click();

    cy.url().should("include", "/institui%C3%A7%C3%A3o");

    cy.window().then((win) => {
      const currentUserJson = win.localStorage.getItem('currentUser')
      expect(currentUserJson).to.be.a('string').that.is.not.empty

      const currentUser = JSON.parse(currentUserJson)

      expect(currentUser).to.have.property('token')
      expect(currentUser.token).to.be.a('string').that.is.not.empty

      // salva dados em fixture/currentUser.json
      cy.saveAtFixture('currentUser', currentUser)
    })
  });
});
