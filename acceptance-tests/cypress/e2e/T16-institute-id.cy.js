describe("Página com detalhes da Instituição", () => {

  beforeEach(() => {
    cy.logout()
    cy.visit("/")
  })

  it("usuário não-autenticado deve conseguir ver a página com os detalhes da instituição indo direto para a URL", () => {
    cy.getUserId().then((id) => {
      cy.visit(`/institute/${id}`);
    })

    cy.fixture("currentUser").then(({user}) => {
      cy.get("h2").should("contain", user.name)
      cy.get('[id="insituteDescription"]').should("include", user.description)
    })
  });

  it("usuário não-autenticado deve conseguir ver a página com os detalhes da instituição", () => {
    cy.visit("/institutes");

    cy.get('[class^="Institutes_card"]')
      .find('button[type="button"]')
      .click()

    cy.getUserId().then((id) => {
      cy.url().should("include", `/institute/${id}`);
    })

    cy.fixture("currentUser").then((institute) => {
      cy.get("h2").should("contain", institute.user.name)
    })

    cy.fixture("institute").then((institute) => {
      cy.get('[id="insituteDescription"]').should("contain", institute.description)
    })
  });
});
