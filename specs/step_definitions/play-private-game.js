import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in as Admin", () => {
  cy.visit("http://localhost:3000/landingpage");

  cy.url().should("include", "landingpage");

  cy.get('[type="text"]').type("Admin");

  cy.get('[type="password"]').type("PasswordAdmin1!");

  cy.get(".centerInputs > :nth-child(8)").click();

  cy.url().should("include", "home");
});

When("I click the private button", () => {
  cy.get(".mb-4 > .btn-primary").click();

  cy.get(".card-body > .mb-2 :first-child").should("be.visible");
});

When("I start a private game", () => {
  cy.get(".card-body > .mb-2 :first-child").click();

  cy.get(".dropdown-item").should("be.visible");

  cy.get(".dropdown-item").click();

  cy.get(".card-body > .btn-primary").click();
});

Then("I should see game starting", () => {
  cy.url().should("include", "Game");
});
