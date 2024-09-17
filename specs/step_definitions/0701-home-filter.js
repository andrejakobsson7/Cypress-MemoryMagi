import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Guid } from "js-guid";

let newUserEmail;
let newUserUsername;
let newUserPassword;
let foundPublicGamesCategoryIndex = 1;
let foundPrivateGamesCategoryIndex = 1;
let newPublicGame;
let newPrivateGame;
let allowedUsers;

const newGameWithInviteName = Guid.newGuid().toString();

const newGameWithInvite = {
  name: `${newGameWithInviteName}`,
  categoryId: 0,
  difficultyLevelId: 0,
  gameType: "private",
  createdBy: "",
  items: [
    {
      name: "Harry Potter",
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg",
    },
    {
      name: "Severus Snape",
      image:
        "https://static.wikia.nocookie.net/warner-bros-entertainment/images/c/c1/Severus-snape1.jpg/revision/latest?cb=20171112083156",
    },
    {
      name: "Albus Dumbledore",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqsFTMdBRWk94r-jZJ6z4NJ43D4SD84JkaLA&s",
    },
    {
      name: "Minerva Mcgonagall",
      image: "https://miro.medium.com/v2/resize:fit:1392/0*rM-tqNRZJALL2YVd",
    },
  ],
  allowedUsers: [],
};

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
  newUserUsername = newUsername;
  newUserPassword = "passWord123!";
  cy.apiRegister(newUserEmail, newUserUsername, newUserPassword);
});

Given("I have logged in as new user", () => {
  cy.apiLogin(newUserUsername, newUserPassword);
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

/*
***
Scenario: Second user filters on private games after being invited to private game by first user
***
*/

Given(
  "that first user has created a new private game and invited second user to it",
  () => {
    //Log in as admin
    cy.apiLogin("admin", "PasswordAdmin1!").then(() => {
      //Get all users
      cy.request("https://localhost:7259/api/Users/users")
        .then((response) => {
          allowedUsers = Array.from(response.body);
          //Find user with username newly registered
          const userToInvite = allowedUsers.find((u) => {
            return u.userName === newUserUsername;
          });
          //Set allowed users array in new game object
          newGameWithInvite.allowedUsers.push({
            userId: userToInvite.userId,
            gameId: 0,
          });
          //Set category id to new game object
          newGameWithInvite.categoryId = Cypress.env("newCategory").id;
          //Set difficulty level id to new game object
          newGameWithInvite.difficultyLevelId =
            Cypress.env("newDifficultyLevel").id;
          //Find creator of the game (admin)
          const creator = allowedUsers.find((u) => {
            return u.userName === "Admin";
          });
          //Set created by to admin
          newGameWithInvite.createdBy = creator.userId;
        })
        .then(() => {
          //Post game
          cy.makePost(
            "https://localhost:7259/api/Game/PostGame",
            newGameWithInvite,
            "newGameWithInvite"
          );
        });
    });
  }
);

When("the second user filters on private games", () => {
  //Login as second user
  cy.apiLogin(newUserUsername, newUserPassword);
  //Visit home page
  cy.visitHomePage();
  //Filter on private games
  cy.get(".mb-4 > .btn-primary").click({ force: true });
});

Then("I should see the game that I have been invited to", () => {
  //Get game name from cypress environment
  const addedGame = JSON.parse(Cypress.env("newGameWithInvite"));
  //Click the "Välj spel"-button
  cy.get(".card-body > .mb-2").click();
  //Ensure that the dropdown has the game the player has been invited to.
  cy.get(".dropdown-item")
    .should("have.length", 1)
    .first()
    .should("include.text", addedGame.Name);

  //Clean up game
  cy.apiLogin("admin", "PasswordAdmin1!").then(() => {
    const gameToDelete = JSON.parse(Cypress.env("newGameWithInvite"));
    cy.cleanUp(
      `https://localhost:7259/api/Game/DeleteGame?gameId=${gameToDelete.Id}`
    ).then(() => {
      //Clean up user
      cy.cleanUp(
        `https://localhost:7259/api/Users/delete-user?email=${newUserEmail}`
      );
    });
  });
});
