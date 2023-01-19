const { afterEach } = require("mocha");

describe("Formulário de Edição de Instituição", () => {

  beforeEach(() => {
    cy.login()
  })

  afterEach(() => {
    // Atualiza a fixture com os dados da instituição
    cy.window().then((win) => {
      const currentUserJson = win.localStorage.getItem('currentUser')
      const currentUser = JSON.parse(currentUserJson)
      cy.saveAtFixture('currentUser', currentUser)
    })
  })

  it("usuário deve conseguir editar a instituição", () => {
    cy.loadFixture("currentUser").then(({user}) => {
      cy.visit(`/instituição/${user.idUser}`);
    })

    cy.get('input[name="address.district"]').type("Camobi");
    cy.get('textArea[name="openHours"]').type("08:00 - 12:00 / 13:30 - 17:30");
    cy.get('textArea[name="description"]').type("Descrição");
    cy.get('textArea[name="bankAccount"]').type("Conta: euaheuahe / Agencia: auheuaheuah");

    cy.get("button[type='submit']").click();

    cy.get('[role="alert"]').contains("Atualizado com sucesso!")
  });
});
