describe("Listagem das Instituições", () => {

  beforeEach(() => {
    cy.logout()
    cy.visit("/")
    cy.visit("/institutes");
  })

  it("usuário deve ver a página com as Instituições da plataforma", () => {
    cy.get('[id="root"]')
      .should('contain', 'Conheça as instituições participantes da plataforma Faz um Bem!')
      .find('h2')
      .should('contain', "Instituições")
      .should('contain', "participantes")
  });

  it("usuário deve ver todas as Instituições cadastradas na plataforma", () => {
    cy.fixture("users").then((institute) => {
      cy.get('[class^="Institutes_card"]')
        .should('contain', institute.name)
    })
  });
});
