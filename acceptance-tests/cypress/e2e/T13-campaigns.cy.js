describe("Listagem das Campanhas", () => {

  beforeEach(() => {
    cy.logout()
    cy.visit("/")
    cy.visit("/campaigns");
  })

  it("usuário deve ver a página com as Campanhas da plataforma", () => {
    cy.get('[id="root"]')
      .should('contain', 'Conheça as campanhas que estão precisando de doações nesse momento!')
      .find('h2')
      .should('contain', "Campanhas em")
      .should('contain', "andamento")
  });

  it("usuário deve ver todas as Campanhas cadastradas na plataforma", () => {
    cy.fixture("campaign").then((campaign) => {
      cy.get('[class^="Campaigns_card"]')
        .should('contain', campaign.title)
        .should('contain', campaign.description)
        // .should('contain', campaign.link)
    })
  });
});
