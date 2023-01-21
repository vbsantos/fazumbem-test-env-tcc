describe("Recuperação de Senha", () => {

  before(() => {
    cy.maildevDeleteAllMessages();
  })

  beforeEach(() => {
    cy.logout()
    cy.visit("/login");
  })

  it("usuário não-autenticado deve ser capaz de recuparar a senha usando o email", () => {
    cy.get("p").contains("Esqueci minha senha").click()

    cy.getLoginData().then((login) => {
      cy.get('input[name="email"]').type(login.email);
    })

    cy.get("button[type='submit']").contains("Solicitar").click();

    cy.get('[role="alert"]').should("contain", "Email de recuperação enviado com sucesso!");

    cy.maildevGetLastMessage().then((email) => {
      expect(email.subject).to.equal("Acesso - Faz um Bem");

      cy.getLoginDataFromEmail(email).then((login) => {
        cy.setLoginData(login.email, login.password)
      })
    });
  });
});
