describe("Página com detalhes da Instituição", () => {

  beforeEach(() => {
    cy.logout()
    cy.visit("/")
  })

  it("usuário deve conseguir ver a página com os detalhes da instituição sem estar logado", () => {
    cy.getUserId().then((id) => {
      cy.visit(`/institute/${id}`);
    })
    cy.fixture("currentUser").then(({user}) => {
      cy.get("h2").should("contain", user.name)
      cy.get('[id="insituteDescription"]').should("include", user.description)
    })
  });

  it("usuário deve conseguir ver a página com os detalhes da instituição sem estar logado", () => {
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
