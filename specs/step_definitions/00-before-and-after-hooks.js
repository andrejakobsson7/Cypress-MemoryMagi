import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Guid } from "js-guid";

let newDifficultyLevel = {
  name: "Lätt",
  level: 1,
  nrOfCards: 4,
};

const categoryGuid = Guid.newGuid().toString();
let newCategory = {
  name: `category_${categoryGuid}`,
  image:
    "https://images.desenio.com/zoom/wb0008-8harrypotter-hogwarts50x70-933-74700.jpg",
};

const publicGameGuid = Guid.newGuid().toString();
let newPublicGame = {
  name: `game_${publicGameGuid}`,
  gameType: "public",
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
};

const privateGameGuid = Guid.newGuid().toString();
let newPrivateGame = {
  name: `game_${privateGameGuid}`,
  gameType: "private",
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
};

/*
Before all tests, login as admin and add:
- One difficulty level
- One category
- One private game
- One public game
And store them as cypress environment variables, so they can be reached from test cases.
*/

before(() => {
  //Log in as admin
  cy.apiLogin("admin", "PasswordAdmin1!").then(() => {
    //Post new difficulty level
    cy.makePost(
      "https://localhost:7259/api/DifficultyLevel/PostDifficultyLevel",
      newDifficultyLevel,
      "newDifficultyLevel"
    ).then(() => {
      //Post new category
      cy.makePost(
        "https://localhost:7259/api/Category",
        newCategory,
        "newCategory"
      ).then(() => {
        //Get and set difficulty level-id
        newPublicGame.DifficultyLevelId = Cypress.env("newDifficultyLevel").id;
        newPrivateGame.DifficultyLevelId = Cypress.env("newDifficultyLevel").id;
        //Get and set category id
        newPublicGame.CategoryId = Cypress.env("newCategory").id;
        newPrivateGame.CategoryId = Cypress.env("newCategory").id;
        //Post public game
        cy.makePost(
          "https://localhost:7259/api/game/PostGame",
          newPublicGame,
          "newPublicGame"
        ).then(() => {
          //Post private game
          cy.makePost(
            "https://localhost:7259/api/game/PostGame",
            newPrivateGame,
            "newPrivateGame"
          ).then(() => {
            //Log out
            cy.apiLogout();
          });
        });
      });
    });
  });
});

/*
After all tests, delete everything that was added in the before hook. 
*/

after(() => {
  cy.apiLogin("admin", "PasswordAdmin1!").then(() => {
    //Delete category. By doing so, all created games related to that category will also be deleted automatically.
    cy.cleanUp(
      `https://localhost:7259/api/Category/DeleteCategory?categoryId=${newPrivateGame.CategoryId}`
    ).then(() => {
      //Remove difficulty level
      cy.cleanUp(
        `https://localhost:7259/api/DifficultyLevel/DeleteDifficultyLevel?difficultyLevelId=${newPrivateGame.DifficultyLevelId}`
      ).then(() => {
        //Log out
        cy.apiLogout();
      });
    });
  });
});
