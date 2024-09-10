import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("that I am on the landing and try to enter wrong", () => {
  // sign out för att inte vara authorized
  cy.apiLogout();
  cy.visit("http://localhost:3007/landingpage");
});

Given("I try to change my url to {string}", (a) => {
  cy.visit(a);
});

When("the routes fail", () => {
  //
});

Then("I will not be able to see the games", () => {
  cy.visit("http://localhost:3007/landingpage");
  cy.get("#createAccountButton").should("exist");
  cy.get("#loginButton").should("exist");
});
