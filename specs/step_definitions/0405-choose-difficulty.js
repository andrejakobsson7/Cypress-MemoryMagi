import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("that I am logged", () => {
  cy.apiLogin("admin", "PasswordAdmin1!");
});

Given("standing on home page", () => {
  // cy.visitHomePage();
  cy.visit("http://localhost:3007/home");
});

Given("that I am in on the home page", () => {
  //
  cy.get(".me-3").should("exist");
  cy.get(".mb-4 > .btn-success").should("exist");
});

Given("When i choose to play a public game", () => {
  cy.get(".me-3");
  cy.get(".row > :nth-child(1)");
});

Given("before I try to start the game I choose a difficulty", () => {
  cy.get(".row > :nth-child(1)").should("be.visible");
  cy.get(":nth-child(1) > .card-body > .mb-2").should("be.visible");
  cy.contains("Välj spel").click({ force: true }); // dålig habit
  cy.get(".dropdown-item").click({ force: true }); // dålig habit
  //cy.get(".dropdown-item").should("be.visible").first().click();
});

When("I click on Start game", () => {
  cy.get(":nth-child(1) > .card-body > .btn-primary").click({ force: true }); // dålig habit
});

Then("the game will start", () => {
  cy.request("http://localhost:3007/Game");
});
