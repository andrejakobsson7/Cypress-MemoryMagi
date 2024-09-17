import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Guid } from "js-guid";

let newUserUsername;
let newUserEmail;
let newUserPassword;
let newlyAddedGameId;
let invitedUsers;

/*
***
Background
***
*/
/* No duplicate steps, this one already in 0301-preview-category.js
Given('that I am logged in', () => {});*/

/* No duplicate steps, this one already in 0301-preview-category.js
Given('standing on the create page', () => {});*/

/*

/*
***
Scenario: See link to invite other players
***
*/

Given("I have selected game type {string}", (privateGameType) => {
  cy.get(":nth-child(2) > select").select(privateGameType, { force: true });
});

Then("I should see a button to invite other players", () => {
  cy.get(".create-button-group > :nth-child(2)")
    .should("exist")
    .should("have.text", "Bjud in användare");
});

/*
***
Scenario: See other players to invite to game
***
*/

Given("that there exists another user", () => {
  //Create new user. Makes sure that there exists at least one other user to invite.
  const newUsername = Guid.newGuid().toString();
  newUserEmail = newUsername + "@hotmail.com";
  newUserUsername = newUsername;
  newUserPassword = "passWord123!";
  cy.apiRegister(newUserEmail, newUserUsername, newUserPassword);
  cy.log("New user" + `${newUserUsername}`);
});

/* No duplicate steps, this one already above
Given('I have selected game type {string}', (a) => {});*/

When("I open the invite-players modal", () => {
  cy.intercept("https://localhost:7259/api/users/user").as("getCurrentUser");
  cy.intercept("https://localhost:7259/api/users/users").as("getAllUsers");
  cy.get(".create-button-group > :nth-child(2)").click();
  cy.get(".modal-content").should("be.visible");
  cy.get(".modal-title").should("have.text", "Bjud in användare");
  cy.wait("@getCurrentUser");
  cy.wait("@getAllUsers");
});

Then("I should see the newly registered user", () => {
  cy.get(".modal-body").should("include.text", `${newUserUsername}`);
  cy.log(`Deleting ${newUserUsername} `);
  cy.cleanUp(
    `https://localhost:7259/api/Users/delete-user?email=${newUserEmail}`
  );
});

/*
Scenario: Invite other players to game
*/

/* No duplicate steps, this one already above
Given('that there exists another user', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected game type {string}', (a) => {});*/

Given("I have opened the invite-players modal", () => {
  cy.get(".create-button-group > :nth-child(2)").click();
});

When("I click on the newly registered user", () => {
  cy.get(".mt-3")
    .contains(newUserUsername)
    .first()
    .click()
    .should("have.class", "active");
});

When("I click on save users-button", () => {
  cy.get(".modal-footer > .btn").click();
});

Then("I should see the list of invited users", () => {
  //Complicated selector due to missing id/class on nr of invited users
  cy.get(":nth-child(5) > p").then(($paragraph) => {
    const text = $paragraph.text();
    const indexOfColon = text.lastIndexOf(":");
    const textAfterColon = parseInt(text.substring(indexOfColon + 1).trim());
    expect(textAfterColon).eq(1);
  });
  cy.cleanUp(
    `https://localhost:7259/api/Users/delete-user?email=${newUserEmail}`
  );
});

/*
***
Scenario: Not see link to invite other players
***
*/

/* No duplicate steps, this one already above
Given('I have selected game type {string}', (a) => {});*/

Then("I should not see a button to invite other players", () => {
  //Poor selector due to missing ID on element.
  cy.get(".create-button-group > :nth-child(2)").should(
    "not.have.text",
    "Bjud in användare"
  );
});

/*
***
Scenario: Change game type after inviting users
***
*/

/* No duplicate steps, this one already above
Given('that there exists another user', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected game type {string}', (a) => {});*/

Given("I have invited one other player", () => {
  cy.openInviteUsersModal();
  cy.invitePlayer(newUserUsername);
  cy.saveInvitedPlayersToGame();
});

When("I select game type {string}", (publicGameType) => {
  // TODO: implement step
  cy.get(":nth-child(2) > select").select(publicGameType, { force: true });
});

Then("I should not see information about nr of invited users", () => {
  // TODO: implement step
  cy.get(":nth-child(5) > p").should("not.exist");
});
