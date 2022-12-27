describe("login on app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login successfully", () => {
    cy.login(Cypress.env(userName), Cypress.env(password));
    cy.contains("a", "(Logout)").should("be.visible");
  });

  it("should login fail", () => {
    cy.login("test", "1234");
    cy.on("window:alert", (str) => {
        expect(str).to.equal('Invalid user name or password');
    });
  });

  
});
