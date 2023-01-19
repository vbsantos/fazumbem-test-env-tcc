describe("Formulário de Registro", () => {
  it("usuário deve ver uma mensagem de erro quando não informa um campo obrigatório", () => {
    cy.visit("/register");

    cy.get('input[name="cpf"]').type("21854291599");
    cy.get('input[name="name"]').type("VBS LTDA.");
    cy.get('input[name="username"]').type("email-teste@gmail.com");
    cy.get('input[name="password"]').type("senha123");
    cy.get('input[name="telephone"]').type("55992144242");
    cy.get('input[name="cep"]').type("97010150");
    cy.get('input[name="street"]').type("Rua Daudt");
    cy.get('input[name="number"]').type("425");
    // cy.get('input[name="complement"]').type("apto. 401");
    cy.get('select[name="state"]').select("RS");
    cy.get('input[name="city"]').type("Santa Maria");

    cy.get("button[type='submit']").click();

    cy.get('[role="alert"]').contains("Campo obrigatório")
  });

  it("usuário deve ser capaz de se registrar com sucesso ao informar todos os campos obrigatórios", () => {
    cy.visit("/register");

    // TODO: random / FAKER
    cy.loadFixture("users").then((user) => {
      // cy.log(user)
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
    cy.get('[role="status"]').contains("Acesse o login e entre na sua conta.")
  });

  it("usuário deve ver uma mensagem de erro quando informa um email já cadastrado", () => {
    cy.visit("/register");

    // TODO: random / FAKER
    cy.loadFixture("users").then((user) => {
      // cy.log(user)
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
    // cy.fillForm("user1")

    cy.get("button[type='submit']").click();

    cy.get('[role="status"]').contains("Verifique seus dados e tente novamente")
  });
});
