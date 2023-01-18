describe("Register", () => {
  it("usuário deve ver uma mensagem de erro quando não informa um campo obrigatório", () => {
    cy.visit("/register");

    cy.get('input[name="cpf"]').type("84981132107");
    cy.get('input[name="name"]').type("VBS LTDA.");
    cy.get('input[name="username"]').type("vbsantto@gmail.com");
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

    cy.get('input[name="cpf"]').type("84981132107");
    cy.get('input[name="name"]').type("VBS LTDA.");
    cy.get('input[name="username"]').type("vbsanttos@gmail.com");
    cy.get('input[name="password"]').type("senha123");
    cy.get('input[name="telephone"]').type("55992144141");
    cy.get('input[name="cep"]').type("97010150");
    cy.get('input[name="street"]').type("Rua Daudt");
    cy.get('input[name="number"]').type("425");
    cy.get('input[name="complement"]').type("apto. 401");
    cy.get('select[name="state"]').select("RS");
    cy.get('input[name="city"]').type("Santa Maria");

    cy.get("button[type='submit']").click();

    cy.url().should("include", "/login");
    cy.get('[role="status"]').contains("Acesse o login e entre na sua conta.")

    // TODO: aguarda o email e valida se veio uma senha
  });

  it("usuário deve ver uma mensagem de erro quando informa um email já cadastrado", () => {
    cy.visit("/register");

    cy.get('input[name="cpf"]').type("75153453650");
    cy.get('input[name="name"]').type("VBS2 LTDA.");
    cy.get('input[name="username"]').type("vbsanttos@gmail.com");
    cy.get('input[name="password"]').type("senha1232");
    cy.get('input[name="telephone"]').type("55992144142");
    cy.get('input[name="cep"]').type("97010190");
    cy.get('input[name="street"]').type("Rua Daudt");
    cy.get('input[name="number"]').type("425");
    cy.get('input[name="complement"]').type("apto. 401");
    cy.get('select[name="state"]').select("RS");
    cy.get('input[name="city"]').type("Santa Maria");

    cy.get("button[type='submit']").click();

    cy.get('[role="status"]').contains("Verifique seus dados e tente novamente")
  });
});
