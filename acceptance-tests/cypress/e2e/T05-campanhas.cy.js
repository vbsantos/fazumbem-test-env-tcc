describe("Lista de Campanhas da Instituição", () => {

  beforeEach(() => {
    cy.login()

    cy.visit("/")
    cy.getUserId().then((id) => {
      cy.visit(`/instituição/${id}`);
    })
    cy.visit("/campanhas");
  })

  it("usuário deve conseguir ver a campanha criada", () => {
    cy.fixture("campaign").then((newCampaign) => {
      cy.get('[role="row"]')
        .should('have.length', 2) // header e body
        .find('[role="gridcell"]')
        .should('have.length', 3) // título, descrição e ações
        .should('contain', newCampaign.title)
        .should('contain', newCampaign.description)
      })
  });
});
