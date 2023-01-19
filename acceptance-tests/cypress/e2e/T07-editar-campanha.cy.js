describe("Clicar na ação 'Editar' de uma Campanha criada", () => {

  beforeEach(() => {
    // Insere token no localStorage
    cy.login()

    // Faz caminho padrão pra ser reconhecido pelo useHistory
    cy.visit("/")
    cy.getUserId().then((id) => {
      cy.visit(`/instituição/${id}`);
    })
    cy.visit("/campanhas");
  })

  it("usuário deve conseguir ir para a página de edição da Campanha", () => {
    cy.get('button[type="button"]').contains("Ações").click({ force: true })

    cy.get('button[role="menuitem"][data-index="1"]').contains("Editar").click()

    cy.url().should("include", `/campanha/1`)
  });
});
