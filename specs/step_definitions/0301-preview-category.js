import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Guid } from "js-guid";

const newCategoryName = Guid.newGuid().toString();

/*
***
Background
***
*/
Given("that I am logged in", () => {
  cy.apiLogin("admin", "PasswordAdmin1!");
});

Given("standing on the create page", () => {
  cy.visit("/create");
  cy.url().should("include", "/create");
});

Given("I have opened the add category-modal", () => {
  cy.get(".create-secondary-button").click();
  cy.get(".modal-body").should("be.visible");
});

/*
***
Scenario: Show preview information
***
*/

When("I type {string} in the category name field", (categoryName) => {
  cy.get("#formCategoryName").type(categoryName);
});

When("I type {string} in the image-url field", (imageUrl) => {
  cy.get("#formCategoryImage").type(imageUrl);
});

Then(
  "I should see a preview containing {string} and the image src should be {string}",
  (name, imageUrl) => {
    cy.get(".category-name").contains(name);
    cy.get("img").should("have.attr", "src").should("include", imageUrl);
  }
);

/*
***
Scenario: Update preview information
***
*/

Given(
  "that I have already typed in category name field and image-url field",
  () => {
    cy.enterCategoryInfo(
      newCategoryName,
      "https://cdn.pixabay.com/photo/2023/05/17/19/34/hogwarts-8000905_1280.png"
    );
  }
);

When("I clear the category name field", () => {
  cy.get("#formCategoryName").clear();
});

/* No duplicate steps, this one already above
When('I type {string} in the category name field', (a) => {});*/

When("I clear the image-url field", () => {
  cy.get("#formCategoryImage").clear();
});

/* No duplicate steps, this one already above
When('I type {string} in the image-url field', (a) => {});*/

/* No duplicate steps, this one already above
Then('I should see a preview containing {string} and the image src should be {string}', (a, b) => {});*/

/*
***
Scenario: Close and reopen add category-modal
***
*/
/* No duplicate steps, this one already above
Given('that I have already typed in category name field and image-url field', () => {});*/

Given("I have closed the modal", () => {
  cy.get(".btn-close").click();
});

When("I open the modal again", () => {
  cy.get(".create-secondary-button").click();
});

Then("the input fields should be empty", () => {
  cy.get("#formCategoryName").should("have.value", "");
  cy.get("#formCategoryImage").should("have.value", "");
});

Then("the preview should be restored", () => {
  cy.get("img").should("not.exist");
  cy.get(".category-name").should("not.have.text", newCategoryName);
});
