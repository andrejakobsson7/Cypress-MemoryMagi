import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I am on the Landingpage', () => {
  cy.visit('http://localhost:3000/landingpage')
});

When('I write {string} in the input with placeholder {string}', (text, placeholder) => {
  cy.get(`input[placeholder*="${placeholder}"]`).type(text);
});

When('I press the button containing {string}', (text) => {
  cy.contains(text).should('be.visible').click({ force: true });
});

Then('the url should contain {string}', (url) => {
  cy.url().should('include', url);
});

Given('that I can see a category called {string}', (name) => {
  cy.contains(name).should('be.visible');
});

When('I click the text in the dropdownlist containg {string}', (text) => {
  cy.contains(text).click({ force: true });
});

