describe("Clicar na ação 'Deletar' de uma Campanha criada", () => {

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

  it("usuário deve receber um modal de confirmação ao clicar na ação 'Deletar'", () => {
    cy.get('button[type="button"]').contains("Ações").click({ force: true })

    cy.get('button[role="menuitem"][data-index="2"]').contains("Deletar").click({ force: true })

    cy.get('.chakra-modal__content-container')
      .should('be.visible')
      .should('contain', 'Deseja confirmar a ação?')
      .should('contain', 'Confirmar')
      .should('contain', 'Fechar');

    // TODO: validação sobre o que acontece ao clicar em confirmar/fechar
    // cy.url().should("include", `/campanha/1`)
  });
});
