import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const timestamp = new Date().getTime();

Given('that I am on the landingpage', () => {
    cy.visit("/landingpage");
});

Given('I click Skapa konto on the page', () => {
   cy.get('.centerInputs > :nth-child(7)').click();
});

When('I enter {string} and {string} and {string} into my input fields', (a, b, c) => {
  cy.get('.modalComponent > [placeholder="Användarnamn"]').type(a).type(timestamp);
  cy.get('[placeholder="Email"]').type(timestamp).type(b);
  cy.get('.modalComponent > [type="password"]').type(c);
});

When('I click on Registrera i will get {string}', (a) => {
  cy.get('.modalComponent > .roundButton').click()
  cy.get('.centerInputs > div').should('contain.text', a);
});