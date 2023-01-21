describe("Página 'Sobre'", () => {

  beforeEach(() => {
    cy.visit("/about");
  })

  it("usuário não-autenticado deve conseguir ver a página 'Sobre'", () => {
    cy.get('[id="about"]')
      .should('contain', 'Faz um bem! propõe-se, como uma plataforma virtual interativa')
      .should('contain', 'A ideia dessa plataforma surgiu em um contexto de emergência de saúde pública mundial com a pandemia de COVID-19 que intensificou a necessidade de ações sociais por parte da sociedade civil organizada e do Estado, especialmente através das políticas públicas e sociais.')
      .find('h2')
      .should('contain', "Sobre")
  });
});
