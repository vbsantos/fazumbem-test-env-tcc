describe("Página da Instituição", () => {

  beforeEach(() => {
    cy.visit("/")
  })

  it("usuário deve conseguir ver a página com os detalhes da instituição sem estar logado", () => {
    cy.logout()

    cy.getUserId().then((id) => {
      cy.visit(`/institute/${id}`);
    })

    cy.fixture("currentUser").then(({user}) => {
      cy.get("h2").should("contain", user.name)
      cy.get('[id="insituteDescription"]').should("include", user.description)
    })
  });
});
