describe("Página da Instituição", () => {

  beforeEach(() => {
    cy.visit("/")
  })

  it("usuário deve conseguir ver a página com os detalhes da instituição sem estar logado", () => {
    cy.getUserId().then((id) => {
      cy.visit(`/institute/${id}`);
    })

    cy.fixture("currentUser").then(({user}) => {
      cy.get('h2').contains(user.name)
      cy.get('[id="insituteDescription"]').contains(user.description)
    })
  });
});
