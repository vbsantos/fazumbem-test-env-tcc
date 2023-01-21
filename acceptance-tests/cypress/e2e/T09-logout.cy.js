describe("Logout", () => {

  beforeEach(() => {
    cy.login()
  })

  it("usuário deve conseguir fazer logout", () => {
    cy.loadFixture("currentUser").then(({user}) => {
      cy.visit(`/instituição/${user.idUser}`);
    })

    cy.get('button[type="button"]').contains("Sair").click();

    cy.window().then((win) => {
      const currentUserJson = win.localStorage.getItem('currentUser')
      expect(currentUserJson).to.be.null
    })

    cy.url().should("include", "/");
  });
});
