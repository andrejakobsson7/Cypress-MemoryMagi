import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Guid } from "js-guid";

let newUserEmail;
let newUserPassword;
let foundPublicGamesCategoryIndex = 1;
let foundPrivateGamesCategoryIndex = 1;
let newPublicGame;
let newPrivateGame;

/*
***
Background
***
*/
Given(
  "that first user has created one public game and one private game",
  () => {
    //Admin has created one public game and one private game in the before hook.
    newPublicGame = JSON.parse(Cypress.env("newPublicGame"));
    newPrivateGame = JSON.parse(Cypress.env("newPrivateGame"));
    expect(newPublicGame).to.not.be.null;
    expect(newPrivateGame).to.not.be.null;
  }
);

/*
***
Scenario: First user filters on private games
***
*/

Given("that I am signed in as first user", () => {
  cy.apiLogin("admin", "PasswordAdmin1!");
});

Given("standing on the home page", () => {
  cy.visitHomePage();
});

When("I click the button to filter on public games", () => {
  cy.get(".me-3").click({ force: true });
});

Then("I should see the public game that first user created", () => {
  foundPublicGamesCategoryIndex = 1;
  //Get name of newly created category
  const newlyAddedCategoryName = Cypress.env("newCategory").name;
  //Loop through each title to find the new category's name
  cy.get(".card-body > .card-title")
    .each(($element) => {
      if ($element.text().includes(newlyAddedCategoryName)) {
        return false;
      } else {
        foundPublicGamesCategoryIndex++;
      }
    })
    //Use index of found category to click it's game dropdown.
    .then(() => {
      //Assert card title
      cy.get(
        `:nth-child(${foundPublicGamesCategoryIndex}) > .card-body > .card-title`
      ).should("include.text", newlyAddedCategoryName);
      //Click dropdown
      cy.get(
        `:nth-child(${foundPublicGamesCategoryIndex}) > .card-body > .mb-2`
      ).click();
      //Assert that the category only has one game and holds the game name
      cy.get(".dropdown-item")
        .should("have.length", 1)
        .first()
        .should("include.text", newPublicGame.Name);
    });
});

/*
***
Scenario: Second user filters on public games
***
*/

/* No duplicate steps, this one already above
Given('that I am signed in as first user', () => {});*/

/* No duplicate steps, this one already above
Given('standing on the home page', () => {});*/

When("I click the button to filter on private games", () => {
  cy.get(".mb-4 > .btn-primary").click({ force: true });
});

Then("I should see the private game that first user created", () => {
  foundPrivateGamesCategoryIndex = 1;
  const newlyAddedCategoryName = Cypress.env("newCategory").name;
  //Loop through each title to find the new category's name
  cy.get(".card-body > .card-title")
    .each(($element) => {
      if ($element.text().includes(newlyAddedCategoryName)) {
        return false;
      } else {
        foundPrivateGamesCategoryIndex++;
      }
    })
    //Use index of found category to click it's game dropdown.
    .then(() => {
      //Assert card title
      cy.get(
        `:nth-child(${foundPrivateGamesCategoryIndex}) > .card-body > .card-title`
      ).should("include.text", newlyAddedCategoryName);
      //Click dropdown
      cy.get(
        `:nth-child(${foundPrivateGamesCategoryIndex}) > .card-body > .mb-2`
      ).click();
      //Assert that the category only has one game and holds the game name
      cy.get(".dropdown-item")
        .should("have.length", 1)
        .first()
        .should("include.text", newPrivateGame.Name);
    });
});

/*
***
Scenario: Second user filters on public games
***
*/

Given("that I have just registered as new user", () => {
  //Create new user. A user that has been registered after the above games were created cannot have access to the games.
  const newUsername = Guid.newGuid().toString();
  newUserEmail = newUsername + "@hotmail.com";
  newUserPassword = "passWord123!";
  cy.apiRegister(newUserEmail, newUserPassword);
});

Given("I have logged in as new user", () => {
  cy.apiLogin(newUserEmail, newUserPassword);
});

When("I am standing on the home page", () => {
  cy.visitHomePage();
});

/* No duplicate steps, this one already above
When('I click the button to filter on public games', () => {});*/

/* No duplicate steps, this one already above
Then('I should see the public game that first user created', () => {});*/

/*
***
Scenario: Second user filters on private games
***
*/

/* No duplicate steps, this one already above
Given("I have logged in as new user", () => {

/* No duplicate steps, this one already above
Given('standing on the home page', () => {});*/

/* No duplicate steps, this one already above
When('I click the button to filter on private games', () => {});*/

Then("I should not see the private game that first user created", () => {
  //Shouldn't be any cards at all on this page.
  cy.get(".card-body > .card-title").should("not.exist");
});
