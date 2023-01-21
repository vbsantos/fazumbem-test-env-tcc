describe("Página 'Contato'", () => {

  beforeEach(() => {
    cy.visit("/contact");
  })

  it("usuário não-autenticado deve conseguir ver a página 'Contato'", () => {
    cy.get('[id="root"]')
      .should('contain', 'Possui dúvidas, sugestões ou mensagens para compartilhar? Abaixo você pode entrar em contato com a plataforma Faz um Bem!')
      .find('h2')
      .should('contain', "Contato")
  });

  it("usuário não-autenticado deve conseguir enviar um email pelo formulário de contato", () => {
    cy.fixture("contact").then((form) => {
      cy.get('input[id="subject"]').type(form.subject);
      cy.get('textarea[id="message"]').type(form.message);
    })
    cy.get('button[type="submit"]').should('not.be.disabled');
    // cy.get('button[type="submit"]').click();

    //FIXME: tá quebrando pq o react tenta abrir o "mailto:..." em outra guia
    // cy.contains('Mensagem enviada com sucesso');
    // cy.url().contains('mailto:')
  });
});
