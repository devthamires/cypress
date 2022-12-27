describe("login on app", () => {
  beforeEach(() => {
    cy.visit("https://alura-fotos.herokuapp.com");
  });

  it("should login successfully", () => {
    cy.login("flavio", "123");
    cy.contains("a", "(Logout)").should("be.visible");
  });

  it("should login fail", () => {
    cy.login("test", "1234");
    cy.on("window:alert", (str) => {
        expect(str).to.equal('Invalid user name or password');
    });
  });

  
});
