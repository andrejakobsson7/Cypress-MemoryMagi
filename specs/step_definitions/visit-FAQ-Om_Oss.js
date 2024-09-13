import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on landingpage", () => {
  cy.visit("http://localhost:3000/landingpage");
  cy.url().should("include", "landingpage");
});

When("I click on FAQ", () => {
  cy.get('[href="/FAQ"]').click();
});

Then("I should be on FAQ page", () => {
  cy.url().should("include", "FAQ");
});

/* No duplicate steps, this one already above
Given('I am on landingpage', () => {});*/

When("I click on OmOss", () => {
  cy.get('[href="/aboutus"]').click();
});

Then("I should be on OmOss page", () => {
  cy.url().should("include", "aboutus");
});
