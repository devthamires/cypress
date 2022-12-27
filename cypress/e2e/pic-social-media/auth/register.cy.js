/// <reference types="cypress" />

describe("register new user", () => {
  beforeEach(() => {
    cy.visit("https://alura-fotos.herokuapp.com");
    cy.intercept("GET", "**/user/exists/flavio").as("userTaken");
  });

  it("should be redirect to signup", () => {
    cy.contains("a", "Register now").click();
    cy.url().should("include", "signup");
  });

  it("should be validate inputs form", () => {
    cy.contains("a", "Register now").click();
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Email is required!").should("be.visible");
    cy.contains("button", "Register").click();
    cy.contains("ap-vmessage", "Full name is required!").should("be.visible");
    cy.contains("ap-vmessage", "Password is required!").should("be.visible");
    cy.contains("ap-vmessage", "User name is required!").should("be.visible");
  });

  it("should show error message for email", () => {
    cy.contains("a", "Register now").click();
    cy.get('input[formcontrolname="email"]').type("test");
    cy.get('input[formcontrolname="email"]').blur();
    cy.contains("ap-vmessage", "Invalid e-mail").should("be.visible");
  });

  it("should show error message for password", () => {
    cy.contains("a", "Register now").click();
    cy.get('input[formcontrolname="password"]').type("test");
    cy.get('input[formcontrolname="password"]').blur();
    cy.contains("ap-vmessage", "Mininum length is 8").should("be.visible");
  });

  it("should show error message for username already taken", () => {
    cy.contains("a", "Register now").click();
    cy.get('input[formcontrolname="userName"]').type("flavio");
    cy.wait("@userTaken");
    cy.contains("ap-vmessage", "Username already taken").should("be.visible");
  });

  const users = require("../../../fixtures/users.json");
  users.forEach(({ email, fullName, username, password }) => {
    it(`should register new user ${fullName}`, () => {
      cy.contains("a", "Register now").click();
      cy.contains("button", "Register").click();
      cy.get('input[formcontrolname="email"]').type(email);
      cy.get('input[formcontrolname="fullName"]').type(fullName);
      cy.get('input[formcontrolname="userName"]').type(username);
      cy.get('input[formcontrolname="password"]').type(password);
      cy.contains("button", "Register").click();
    });
  });
});
