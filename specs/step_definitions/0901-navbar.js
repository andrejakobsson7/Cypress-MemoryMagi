import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
/*
***
Scenario: Unauthorized user should only see home link
***
*/
Given("standing on the landing page", () => {
  cy.visitLandingPage();
});

Then("I should only see link to Home", () => {
  cy.get("#navbar-home-link").should("exist");
  cy.get("#navbar-create-link").should("not.exist");
  cy.get("#navbar-profile-link").should("not.exist");
  cy.get("#navbar-logout-link").should("not.exist");
});

/*
***
Scenario: Authorized user should se all links
***
*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I am logged in', () => {});*/

/* No duplicate steps, this one already above
Given('standing on the landing page', () => {});*/

Then("I should see all links", () => {
  cy.get("#navbar-home-link").should("exist");
  cy.get("#navbar-create-link").should("exist");
  cy.get("#navbar-profile-link").should("exist");
  cy.get("#navbar-logout-link").should("exist");
});

/*
***
Scenario: Current page should be highlighted
***
*/
/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I am logged in', () => {});*/

/* No duplicate steps, this one already in 0701-home-filter.js
Given('standing on the home page', () => {});*/

Then("link to Home should look different compared to other links", () => {
  cy.get("#navbar-home-link").should("have.class", "active-link");
  cy.get("#navbar-create-link").should("have.class", "inactive-link");
  cy.get("#navbar-profile-link").should("have.class", "inactive-link");
});
