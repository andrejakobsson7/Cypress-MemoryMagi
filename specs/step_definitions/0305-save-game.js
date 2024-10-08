import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Guid } from "js-guid";

const guid = Guid.newGuid().toString();
let newlyAddedGameId;

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
***
Scenario: Save empty game
***
*/

When("I click the button to create game", () => {
  cy.intercept("POST", "https://localhost:7259/api/game/PostGame").as(
    "postGame"
  );
  cy.get(".create-submit-button").click({ force: true });
});

Then("I should get an error message about missing game name", () => {
  cy.get("input").should("have.focus");
});

/*
***
Scenario: Save game without game type
***
*/

Given("that I have already typed in game name-field", () => {
  cy.get("input").type(guid);
});

/* No duplicate steps, this one already above
When('I click the button to create game', () => {});*/

Then("I should get an error message about missing game type", () => {
  cy.get(":nth-child(2) > select").should("have.focus");
});

/*
***
Scenario: Save game without category
***
*/

/* No duplicate steps, this one already above
Given('that I have already typed in game name-field', () => {});*/

Given("I have selected a game type", () => {
  cy.get(":nth-child(2) > select").select("public");
});

/* No duplicate steps, this one already above
When('I click the button to create game', () => {});*/

Then("I should get an error message about missing category", () => {
  cy.get(":nth-child(3) > select").should("have.focus");
});

/*
***
Scenario: Save game without difficulty level
***
*/

/* No duplicate steps, this one already above
Given('that I have already typed in game name-field', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected a game type', () => {});*/

Given("I have selected a category", () => {
  const categoryId = Cypress.env("newCategory").id;
  cy.get(":nth-child(3) > select").select(categoryId.toString());
});

/* No duplicate steps, this one already above
When('I click the button to create game', () => {});*/

Then("I should get an error message about missing difficulty level", () => {
  cy.get(":nth-child(4) > select").should("have.focus");
});

/*
***
Scenario: Save game without items
***
*/

/* No duplicate steps, this one already above
Given('that I have already typed in game name-field', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected a game type', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected a category', () => {});*/

Given("I have selected difficulty level {string}", (easy) => {
  //Get difficulty id from cypress environment variable
  const difficultyId = Cypress.env("newDifficultyLevel").id;
  //Select by it's id converted as a string
  cy.get(":nth-child(4) > select").select(difficultyId.toString());
});

/* No duplicate steps, this one already above
When('I click the button to create game', () => {});*/

Then("I should get an error message about missing items", () => {
  cy.get(".modal").should("be.visible");
});

/*
***
Scenario: Save game with too few nr of cards
***
*/

/* No duplicate steps, this one already above
Given('that I have already typed in game name-field', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected a game type', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected a category', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected difficulty level {string}', (a) => {});*/

/* No duplicate steps, this one already in 0303-preview-item.js
Given('I have opened the add item-modal', () => {});*/

/* No duplicate steps, this one already in 0304-save-item.js
Given('that I have already saved an item', () => {});*/

/* No duplicate steps, this one already above
When('I click the button to create game', () => {});*/

Then(
  "I should get an error message about wrong number of items for selected difficulty level",
  () => {
    cy.get(".modal-body").should("be.visible");
    cy.get(".modal-body").should(
      "include.text",
      Cypress.env("newDifficultyLevel").nrOfCards
    );
    cy.get(".modal-body").should(
      "include.text",
      Cypress.env("newDifficultyLevel").name
    );
    cy.get("@postGame").should("be.null");
  }
);

/*
***
Scenario: Save game with too many cards
***
*/
/* No duplicate steps, this one already above
Given('that I have already typed in game name-field', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected a game type', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected a category', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected difficulty level {string}', (a) => {});*/

/* No duplicate steps, this one already in 0303-preview-item.js
Given('I have opened the add item-modal', () => {});*/

Given("I have added five items", () => {
  const itemsToAdd = [
    {
      name: "Rubeus Hagrid",
      imageUrl:
        "https://images.ctfassets.net/usf1vwtuqyxm/1HYtzDGOGI2UsCyqWcWUwo/0ad4fed4c0432c7e022f8bdc9f1df957/RubeusHagrid_WB_F3_HagridsFaceLookingSadBeforeExecution_Still_080615_Land.jpg",
    },
    {
      name: "Harry Potter",
      imageUrl:
        "https://static.wikia.nocookie.net/harrypotter/images/c/cf/Harry-Potter-and-the-Deathly-Hallows-Part-2-2011-harry-potter-and-the-deathly-hallows-23712910-1200-800.jpg/revision/latest/thumbnail/width/360/height/360?cb=20111228001303&path-prefix=sv",
    },
    {
      name: "Ron Weasley",
      imageUrl:
        "https://i.insider.com/579f5daddd0895f33d8b475c?width=750&format=jpeg&auto=webp",
    },
    {
      name: "Hermione Granger",
      imageUrl:
        "https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/c/1c/c1c30cf0-7e02-11e7-8808-1b9c7ccfc7d0/598cb51832d12.image.jpg?resize=1200%2C925",
    },
    {
      name: "Draco Malfoy",
      imageUrl:
        "https://hips.hearstapps.com/cosmouk.cdnds.net/15/08/1280x1280/square_nrm_1424419881-draco-malfoy-harry-potter.jpg?resize=1200:*",
    },
  ];

  itemsToAdd.forEach((item) => {
    cy.forceOpenItemModal();
    cy.addItem(item.name, item.imageUrl);
  });
});

/* No duplicate steps, this one already above
When('I click the button to create game', () => {});*/

/* No duplicate steps, this one already above
Then('I should get an error message about wrong number of items for selected difficulty level', () => {});*/

/*
***
Scenario: Save complete game
***
*/

/* No duplicate steps, this one already above
Given('that I have already typed in game name-field', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected a game type', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected a category', () => {});*/

/* No duplicate steps, this one already above
Given('I have selected difficulty level {string}', (a) => {});*/

/* No duplicate steps, this one already in 0303-preview-item.js
Given('I have opened the add item-modal', () => {});*/

Given("I have added four items", () => {
  const itemsToAdd = [
    {
      name: "Rubeus Hagrid",
      imageUrl:
        "https://images.ctfassets.net/usf1vwtuqyxm/1HYtzDGOGI2UsCyqWcWUwo/0ad4fed4c0432c7e022f8bdc9f1df957/RubeusHagrid_WB_F3_HagridsFaceLookingSadBeforeExecution_Still_080615_Land.jpg",
    },
    {
      name: "Harry Potter",
      imageUrl:
        "https://static.wikia.nocookie.net/harrypotter/images/c/cf/Harry-Potter-and-the-Deathly-Hallows-Part-2-2011-harry-potter-and-the-deathly-hallows-23712910-1200-800.jpg/revision/latest/thumbnail/width/360/height/360?cb=20111228001303&path-prefix=sv",
    },
    {
      name: "Ron Weasley",
      imageUrl:
        "https://i.insider.com/579f5daddd0895f33d8b475c?width=750&format=jpeg&auto=webp",
    },
    {
      name: "Hermione Granger",
      imageUrl:
        "https://bloximages.chicago2.vip.townnews.com/tucson.com/content/tncms/assets/v3/editorial/c/1c/c1c30cf0-7e02-11e7-8808-1b9c7ccfc7d0/598cb51832d12.image.jpg?resize=1200%2C925",
    },
  ];

  itemsToAdd.forEach((item) => {
    cy.forceOpenItemModal();
    cy.addItem(item.name, item.imageUrl);
  });
});

/* No duplicate steps, this one already above
When('I click the button to create game', () => {});*/

Then("I should get a confirmation about successfully added game", () => {
  cy.wait("@postGame")
    .then((response) => {
      expect(response.response.body).to.not.be.null;
      expect(response.response.statusCode).to.eq(201);
      const newlyAddedGameObj = JSON.parse(response.response.body);
      newlyAddedGameId = newlyAddedGameObj.Id;
    })
    .then(() => {
      //Make delete request to clean up and delete newly added game
      cy.cleanUp(
        `https://localhost:7259/api/game/DeleteGame?gameId=${newlyAddedGameId}`
      );
    });
});
