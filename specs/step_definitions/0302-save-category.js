import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
let newlyAddedCategoryId;
/*
***
Scenario: Save complete category
***
*/
/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I am logged in', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('standing on the create page', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('I have opened the add category-modal', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I have already typed in category name field and image-url field', () => {});*/

When("I click the save category-button", () => {
  cy.intercept("POST", "https://localhost:7259/api/category").as(
    "postCategory"
  );
  cy.get(".modal-footer > .btn").click();
});

Then(
  "I should see {string} in the list of available categories",
  (categoryName) => {
    cy.wait("@postCategory")
      .then((response) => {
        cy.get(":nth-child(3) > select")
          .find("option")
          .last()
          .should("have.text", categoryName);
        expect(response.response.body).to.not.be.null;
        expect(response.response.statusCode).to.eq(201);
        const newlyAddedCategory = response.response.body;
        newlyAddedCategoryId = newlyAddedCategory.id;
      })
      .then(() => {
        cy.cleanUp(
          `https://localhost:7259/api/Category/DeleteCategory?categoryId=${newlyAddedCategoryId}`
        );
      });
  }
);

/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I have already typed in category name field and image-url field', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
When('I clear the category name field', () => {});*/

/* No duplicate steps, this one already above
When('I click the save category-button', () => {});*/

Then("I should see an error message", () => {
  cy.get("@postCategory")
    .should("have.property", "response")
    .should("have.property", "statusCode", 400);
});

/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I have already typed in category name field and image-url field', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
When('I clear the image-url field', () => {});*/

/* No duplicate steps, this one already above
When('I click the save category-button', () => {});*/

/* No duplicate steps, this one already above
Then('I should see an error message', () => {});*/
