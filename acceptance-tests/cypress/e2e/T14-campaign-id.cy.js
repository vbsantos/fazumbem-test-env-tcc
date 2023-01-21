describe("Página com detalhes da Instituição", () => {

  beforeEach(() => {
    cy.logout()
    cy.visit("/")
  })

  it("usuário não-autenticado deve conseguir ver a página com os detalhes da campanha indo direto para a URL", () => {
    cy.getUserId().then((id) => {
      cy.visit(`/campaign/${id}`);
    })

    cy.fixture("campaign").then(({campaign}) => {
      cy.get("h2").should("contain", campaign.name)
      cy.get('[id="insituteDescription"]').should("include", campaign.description)
    })
  });

  it("usuário não-autenticado deve conseguir ver a página com os detalhes da instituição", () => {
    cy.visit("/campaigns");

    cy.get('[class^="Campaigns_card"]')
      .find('button[type="button"]')
      .eq(0)
      .click()

    cy.url().should("include", `/campaign/1`);

    cy.fixture("campaign").then((campaign) => {
      cy.get('[id="root"]')
        .should("contain", campaign.title)
        .should("contain", campaign.description)
    })

    cy.fixture("currentUser").then((institute) => {
      cy.get("#contacts")
        .should("contain", institute.user.username)
        .should("contain", institute.user.telephone)
    })
  });
});
