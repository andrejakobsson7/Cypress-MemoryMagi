import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am logged in', () => {
  cy.visit("http://localhost:3000/landingpage");

  cy.url().should("include", "landingpage");

  cy.get('[type="text"]').type("Admin");

  cy.get('[type="password"]').type("PasswordAdmin1!");

  cy.get(".centerInputs > :nth-child(8)").click();

  cy.url().should("include", "home");

});

When('I click the profile icon', () => {
   cy.get('[href="/profile"] > span').click();
});

When('I change the email to {string}', (a) => {
  cy.get(':nth-child(2) > .justify-space-between.mt-2 > input').clear();
  cy.get(':nth-child(2) > .justify-space-between.mt-2 > input').type(a);
});

Then('I should see a message {string} when i click the ändra profil detaljer button', (a) => {
  cy.on('window:alert', (alertText) => { 
    expect(alertText).to.equal(a);
});

cy.get(':nth-child(2) > .w-100').click();
});