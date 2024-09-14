import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the log in page', () => {
  cy.visit("/landingpage");
});

Given('when i enter {string} and {string} into my input fields', (a, b) => {
  cy.get('[type="text"]').type(a);
  cy.get('[type="password"]').type(b);
});

When('when i click logga in', () => {
  cy.get('.centerInputs > :nth-child(8)').click();
});

Then('I will enter the Home page', () => {
  cy.wait(500);
  cy.visit("/Home");
});