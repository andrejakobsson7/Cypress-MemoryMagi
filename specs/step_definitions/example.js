import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("that I am on the first page", () => {
  // TODO: implement step
  // cy.loginAsAdmin();
  cy.visit("https://localhost:7259/swagger/index.html");
});

When("I click on the logo", () => {
  cy.get(".frontPagePicture");
});

Then("I can see the picture", () => {
  // TODO: implement step
});
