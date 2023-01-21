describe("Formulário de Edição de Instituição", () => {

  beforeEach(() => {
    cy.login()
  })

  // afterEach(() => {
  //   FIXME: não tá funcionando como deveria
  //   // Atualiza a fixture com os dados da instituição
  //   cy.window().then((win) => {
  //     const currentUserJson = win.localStorage.getItem('currentUser')
  //     const currentUser = JSON.parse(currentUserJson)
  //     cy.saveAtFixture('currentUser', currentUser)
  //   })
  // })

  it("usuário deve conseguir editar a instituição", () => {
    cy.fixture("currentUser").then(({user}) => {
      cy.visit(`/instituição/${user.idUser}`);
    })

    cy.fixture("institute").then((institute) => {
      cy.get('input[name="address.district"]').type(institute.address.district);
      cy.get('textArea[name="openHours"]').type(institute.openHours);
      cy.get('textArea[name="description"]').type(institute.description);
      cy.get('textArea[name="bankAccount"]').type(institute.bankAccount);
    })

    cy.get("button[type='submit']").click();

    cy.get('[role="alert"]').should("contain", "Atualizado com sucesso!")
  });
});
