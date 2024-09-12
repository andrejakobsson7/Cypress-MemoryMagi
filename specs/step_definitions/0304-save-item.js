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

/* No duplicate steps, this one already in 0303-preview-item.js
Given('I have opened the add item-modal', () => {});*/

/*
***
Scenario: Save complete item
***
*/

/* No duplicate steps, this one already in 0303-preview-item.js
Given('that I have already typed in {string} in the item name field and {string} in the image-url field', (a, b) => {});*/

When("I click the save item-button", () => {
  cy.get(".form-inputs > .btn").click();
});

Then(
  "I should see image with src {string} in the list of added items",
  (cardImageUrl) => {
    cy.get("img").should("have.attr", "src").and("include", cardImageUrl);
  }
);

/*
***
Scenario: Save item missing name
***
*/

/* No duplicate steps, this one already in 0303-preview-item.js
Given('that I have already typed in {string} in the item name field and {string} in the image-url field', (a, b) => {});*/

/* No duplicate steps, this one already in 0303-preview-item.js
When('I clear the item name field', () => {});*/

/* No duplicate steps, this one already above
When('I click the save item-button', () => {});*/

Then("I should get a item validation error regarding name", () => {
  cy.get("#formCardName").should("have.focus");
});

/*
***
Scenario: Save item missing image
***
*/

/* No duplicate steps, this one already in 0303-preview-item.js
Given('that I have already typed in {string} in the item name field and {string} in the image-url field', (a, b) => {});*/

/* No duplicate steps, this one already in 0303-preview-item.js
When('I clear the item image-url field', () => {});*/

/* No duplicate steps, this one already above
When('I click the save item-button', () => {});*/

Then("I should get a item validation error regarding image", () => {
  cy.get("#formCardImage").should("have.focus");
});

/*
***
Scenario: Save multiple items
***
*/

Given("that I have already saved an item", () => {
  cy.addItem(
    "Hermione Granger",
    "https://cdn.pixabay.com/photo/2024/02/16/12/17/gryffindor-8577461_1280.png"
  );
});

When("I save another one", () => {
  //The button is hidden by the navbar, which is why I have to use force.
  //I have not been able to use the built in scroll-options in Cypress to scroll to the top and then click, so this is my last resort.
  cy.get(".create-primary-button").first().click({ force: true });
  cy.addItem(
    "Rubeus Hagrid",
    "https://images.ctfassets.net/usf1vwtuqyxm/1HYtzDGOGI2UsCyqWcWUwo/0ad4fed4c0432c7e022f8bdc9f1df957/RubeusHagrid_WB_F3_HagridsFaceLookingSadBeforeExecution_Still_080615_Land.jpg"
  );
});

Then("I should see both items in the list of added items", () => {
  cy.get(".create-card-list-container")
    .find("img")
    .first()
    .should(
      "have.attr",
      "src",
      "https://cdn.pixabay.com/photo/2024/02/16/12/17/gryffindor-8577461_1280.png"
    );
  cy.get(".create-card-list-container")
    .find("img")
    .last()
    .should(
      "have.attr",
      "src",
      "https://images.ctfassets.net/usf1vwtuqyxm/1HYtzDGOGI2UsCyqWcWUwo/0ad4fed4c0432c7e022f8bdc9f1df957/RubeusHagrid_WB_F3_HagridsFaceLookingSadBeforeExecution_Still_080615_Land.jpg"
    );
});
