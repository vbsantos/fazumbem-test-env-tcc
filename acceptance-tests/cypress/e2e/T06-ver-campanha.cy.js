describe("Ver 'Mais Informações' de uma Campanha criada", () => {

  beforeEach(() => {
    cy.login()

    cy.visit("/")
    cy.getUserId().then((id) => {
      cy.visit(`/instituição/${id}`);
    })
    cy.visit("/campanhas");
  })

  it("usuário deve conseguir ir para a página com mais informações sobre uma Campanha", () => {
    cy.get('button[type="button"]').contains("Ações").click({ force: true })

    cy.get('button[role="menuitem"][data-index="0"]').contains("Mais informações").click()

    cy.url().should("include", `/campanha/1?viewInfo`)
  });
});
