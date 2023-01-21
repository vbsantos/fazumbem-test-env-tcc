describe("Formulário de Registro", () => {

  before(() => {
    cy.logout()
    cy.maildevDeleteAllMessages();
  })

  beforeEach(() => {
    cy.visit("/register");
  })

  it("usuário não-autenticado deve ver uma mensagem de erro quando não informa um campo obrigatório", () => {
    cy.loadFixture("users").then((user) => {
      cy.get('input[name="cpf"]').type(user.cpf);
      cy.get('input[name="name"]').type(user.name);
      cy.get('input[name="username"]').type(user.username);
      cy.get('input[name="password"]').type(user.password);
      cy.get('input[name="telephone"]').type(user.telephone);
      cy.get('input[name="cep"]').type(user.cep);
      cy.get('input[name="street"]').type(user.street);
      cy.get('input[name="number"]').type(user.number);
      // cy.get('input[name="complement"]').type(user.complement);
      cy.get('select[name="state"]').select(user.state);
      cy.get('input[name="city"]').type(user.city);
    })

    cy.get("button[type='submit']").click();

    cy.get('[role="alert"]').should("contain", "Campo obrigatório")
  });

  it("usuário não-autenticado deve ser capaz de se registrar com sucesso ao informar todos os campos obrigatórios", () => {
    cy.loadFixture("users").then((user) => {
      cy.get('input[name="cpf"]').type(user.cpf);
      cy.get('input[name="name"]').type(user.name);
      cy.get('input[name="username"]').type(user.username);
      cy.get('input[name="password"]').type(user.password);
      cy.get('input[name="telephone"]').type(user.telephone);
      cy.get('input[name="cep"]').type(user.cep);
      cy.get('input[name="street"]').type(user.street);
      cy.get('input[name="number"]').type(user.number);
      cy.get('input[name="complement"]').type(user.complement);
      cy.get('select[name="state"]').select(user.state);
      cy.get('input[name="city"]').type(user.city);
    })

    cy.get("button[type='submit']").click();

    cy.url().should("include", "/login");
    cy.get('[role="status"]').should("contain", "Acesse o login e entre na sua conta.")

    cy.maildevGetLastMessage().then((email) => {
      expect(email.subject).to.equal("Acesso - Faz um Bem");

      cy.getLoginDataFromEmail(email).then((login) => {
        cy.setLoginData(login.email, login.password)
      })
    });
  });

  it("usuário não-autenticado deve ver uma mensagem de erro quando informa um email já cadastrado", () => {
    cy.loadFixture("users").then((user) => {
      cy.get('input[name="cpf"]').type(user.cpf);
      cy.get('input[name="name"]').type(user.name);
      cy.get('input[name="username"]').type(user.username);
      cy.get('input[name="password"]').type(user.password);
      cy.get('input[name="telephone"]').type(user.telephone);
      cy.get('input[name="cep"]').type(user.cep);
      cy.get('input[name="street"]').type(user.street);
      cy.get('input[name="number"]').type(user.number);
      cy.get('input[name="complement"]').type(user.complement);
      cy.get('select[name="state"]').select(user.state);
      cy.get('input[name="city"]').type(user.city);
    })

    cy.get("button[type='submit']").click();

    cy.get('[role="status"]').should("contain", "Verifique seus dados e tente novamente")
  });
});
