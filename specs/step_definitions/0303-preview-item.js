import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/*
***
BACKGROUND
***
*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I am logged in', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('standing on the create page', () => {});*/

Given("I have opened the add item-modal", () => {
  cy.get(".create-primary-button").click();
  cy.get(".modal-content").should("be.visible");
});

/*
***
SCENARIO: Show preview information
***
*/

When("I type {string} in the item name field", (cardName) => {
  // TODO: implement step
  cy.get("#formCardName").type(cardName);
});

When("I type {string} in the item image-url field", (cardImageUrl) => {
  // TODO: implement step
  cy.get("#formCardImage").type(cardImageUrl);
});

Then(
  "I should see a preview containing {string} and the item image src should be {string}",
  (cardName, cardImageUrl) => {
    // TODO: implement step
    cy.get(".card-name").should("contain", cardName);
    cy.get("img").should("have.attr", "src").and("include", cardImageUrl);
  }
);

/*
***
Scenario: Update preview information
***
*/

Given(
  "that I have already typed in item name field and image-url field",
  () => {
    cy.get("#formCardName").type("Ron Weasley");
    cy.get("#formCardImage").type(
      "https://cdn.pixabay.com/photo/2012/04/12/11/53/harry-potter-29680_1280.png"
    );
  }
);

Given(
  "that I have already typed in {string} in the item name field and {string} in the image-url field",
  (cardName, cardImageUrl) => {
    cy.get("#formCardName").type(cardName);
    cy.get("#formCardImage").type(cardImageUrl);
  }
);

When("I clear the item name field", () => {
  cy.get("#formCardName").clear();
});

/* No duplicate steps, this one already above
When('I type {string} in the item name field', (a) => {});*/

When("I clear the item image-url field", () => {
  cy.get("#formCardImage").clear();
});

/* No duplicate steps, this one already above
When('I type {string} in the item image-url field', (a) => {});*/

/* No duplicate steps, this one already above
Then('I should see a preview containing {string} and the item image src should be {string}', (a, b) => {});*/

/*
***
Scenario: Close and reopen add item-modal
***
*/
/* No duplicate steps, this one already above
Given('that I have already typed in {string} in the item name field and {string} in the image-url field', (a, b) => {});*/

Given("I have closed the add item-modal", () => {
  cy.get(".btn-close").click();
});

When("I open the add item-modal again", () => {
  cy.get(".create-primary-button").first().click();
});

Then("the item-input fields should be empty", () => {
  cy.get("#formCardName").should("have.value", "");
  cy.get("#formCardImage").should("have.value", "");
});

Then("the item-preview should be restored", () => {
  cy.get("img").should("not.exist");
  cy.get(".card-name").should("not.have.text", "Ron Weasley");
});
