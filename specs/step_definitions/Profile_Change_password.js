import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/* No duplicate steps, this one already in Profile_Change_info.js
Given('I am logged in', () => {});*/

/* No duplicate steps, this one already in Profile_Change_info.js
When('I click the profile icon', () => {});*/


When('I enter the current password {string} and the new password {string}', (a, b) => {

  cy.get(':nth-child(4) > :nth-child(1) > input').type(a);
  cy.get(':nth-child(4) > :nth-child(2) > input').type(b);
  cy.get(':nth-child(4) > :nth-child(3) > input').type(b);


});

When('I should see a message popup {string} when I click ändra lössenord', (a) => {
  cy.on('window:alert', (alertText) => { 
    expect(alertText).to.equal(a);
});
cy.get(':nth-child(4) > .w-100').click();
});


