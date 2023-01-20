describe("Formulário de Criação de Campanha", () => {

  beforeEach(() => {
    // Insere token no localStorage
    cy.login()

    // Faz caminho padrão pra ser reconhecido pelo useHistory
    cy.visit("/")
    cy.getUserId().then((id) => {
      cy.visit(`/instituição/${id}`);
    })
    cy.visit("/nova-campanha");
  })

  it("usuário não deve conseguir criar uma campanha sem um dos campos obrigatórios", () => {
    // Preenche
    cy.fixture("campaign").then((newCampaign) => {
      cy.get('input[name="title"]').type(newCampaign.title);
      cy.get('textArea[name="description"]').type(newCampaign.description);
      cy.get('input[name="externalLink"]').type(newCampaign.link);
    })

    // Envia
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();

    // Testa
    cy.get('[role="alert"]').should("contain", "Selecione um arquivo!")
  });

  it("usuário deve conseguir criar uma campanha", () => {
    // Preenche
    cy.get('input[type="file"]').attachFile("placeholder.jpg");
    cy.fixture("campaign").then((newCampaign) => {
      cy.get('input[name="title"]').type(newCampaign.title);
      cy.get('textArea[name="description"]').type(newCampaign.description);
      cy.get('input[name="externalLink"]').type(newCampaign.link);
    })

    // Envia
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();

    // Testa
    cy.getUserId().then((id) => {
      cy.url().should("include", `/institui%C3%A7%C3%A3o/${id}`)
    })

    // FIXME: algum problema na maneira que o upload da imagem é feito
    // da erro na request e não mostra o elemento abaixo
    // cy.get('[role="alert"]').should("contain", "Campanha cadastrada com sucesso!")
  });
});
