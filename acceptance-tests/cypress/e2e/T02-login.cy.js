describe("Formulário de Login", () => {

  beforeEach(() => {
    cy.visit("/login");
  })

  it("usuário deve ver uma mensagem de erro quando informa dados incorretos", () => {
    cy.getLoginData().then((login) => {
      cy.get('input[name="email"]').type(login.email);
    })
    cy.get('input[name="password"]').type("senha-errada");

    cy.get("button[type='submit']").click();

    cy.get('[role="status"]').should("contain", "Verifique seus dados e tente novamente");
  });

  it("usuário deve ser capaz de logar com sucesso e armazenar o token no seu localStorage", () => {
    cy.getLoginData().then((login) => {
      cy.get('input[name="email"]').type(login.email);
      cy.get('input[name="password"]').type(login.password);
    })

    cy.get("button[type='submit']").click();

    cy.url().should("include", "/institui%C3%A7%C3%A3o");

    cy.window().then((win) => {
      const currentUserJson = win.localStorage.getItem('currentUser')
      console.log("🚀 ~ file: T02-login.cy.js:32 ~ cy.window ~ currentUserJson", currentUserJson)

      expect(currentUserJson).to.be.a('string').that.is.not.empty

      const currentUser = JSON.parse(currentUserJson)
      console.log("🚀 ~ file: T02-login.cy.js:36 ~ cy.window ~ currentUser", currentUser)

      expect(currentUser).to.have.property('token')
      expect(currentUser.token).to.be.a('string').that.is.not.empty

      // salva dados em fixture/currentUser.json
      cy.saveAtFixture('currentUser', currentUser)
    })
  });
});
