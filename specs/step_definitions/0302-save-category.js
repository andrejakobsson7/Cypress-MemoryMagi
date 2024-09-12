import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
let newlyAddedCategory;

/*
***
Background
***
*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I am logged in', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('standing on the create page', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('I have opened the add category-modal', () => {});*/

/*
***
Scenario: Save complete category
***
*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I have already typed in category name field and image-url field', () => {});*/

When("I click the save category-button", () => {
  cy.intercept("POST", "https://localhost:7259/api/category").as(
    "postCategory"
  );
  cy.get(".form-section > .create-primary-button").click();
});

Then("I should see category name in the list of available categories", () => {
  cy.wait("@postCategory")
    .then((response) => {
      cy.log("From first");
      cy.log(response);
      expect(response.response.body).to.not.be.null;
      expect(response.response.statusCode).to.eq(201);
      newlyAddedCategory = response.response.body;
      cy.get(
        ".modal.show > .modal-dialog > .modal-content > .modal-header > .btn-close"
      ).click();
    })
    .then(() => {
      cy.log("From nested");
      cy.log(newlyAddedCategory);
      cy.wait("@getAllGamesForGamePage");
      cy.wait("@getCategoriesForCreatePage");
      cy.get(":nth-child(3) > select")
        .find("option")
        .contains(newlyAddedCategory.name)
        .should("have.length", 1);
      cy.cleanUp(
        `https://localhost:7259/api/Category/DeleteCategory?categoryId=${newlyAddedCategory.id}`
      );
    });
});

/*
***
Scenario: Save category missing name
***
*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I have already typed in category name field and image-url field', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
When('I clear the category name field', () => {});*/

/* No duplicate steps, this one already above
When('I click the save category-button', () => {});*/

Then("I should see an error message about missing category name", () => {
  //No post should be made
  cy.get("@postCategory").should("be.null");
  //Field should have focus
  cy.get("#formCategoryName").should("have.focus");
});

/*
***
Scenario: Save category missing image
***
*/
/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I have already typed in category name field and image-url field', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
When('I clear the image-url field', () => {});*/

/* No duplicate steps, this one already above
When('I click the save category-button', () => {});*/

Then("I should see an error message about missing category image", () => {
  //No post should be made
  cy.get("@postCategory").should("be.null");
  //Field should have focus
  cy.get("#formCategoryImage").should("have.focus");
});
