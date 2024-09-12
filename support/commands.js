//Help methods that can be used in test cases where applicable

const baseUrl = require("../baseUrl");

Cypress.Commands.add("visitLandingPage", () => {
  cy.visit("/landingpage");
  cy.url().should("include", "/landingpage");
});

Cypress.Commands.add("visitCreatePage", () => {
  cy.intercept("https://localhost:7259/api/category/GetCategories").as(
    "getCategoriesForCreatePage"
  );
  cy.intercept(
    "https://localhost:7259/api/difficultylevel/GetAllDifficultyLevels"
  ).as("getDifficultyLevelsForCreatePage");
  cy.intercept("https://localhost:7259/api/game/GetAllGames").as(
    "getAllGamesForGamePage"
  );
  cy.visit("/create");
  cy.url().should("include", "/create");
  cy.wait("@getCategoriesForCreatePage");
  cy.wait("@getDifficultyLevelsForCreatePage");
  cy.wait("@getAllGamesForGamePage");
});
Cypress.Commands.add("visitHomePage", () => {
  cy.visit("/");
  cy.url().should("eq", "http://localhost:3000/");
  cy.intercept(
    "https://localhost:7259/api/Category/GetCategoriesWithIncludedData"
  ).as("getCategories");
  cy.wait("@getCategories");
});

Cypress.Commands.add("apiLogin", (username, password) => {
  cy.request("POST", "https://localhost:7259/login", {
    email: username,
    password: password,
  }).then((response) => {
    expect(response).to.have.property("status", 200);
    window.localStorage.setItem("accessToken", JSON.stringify(response.body));
    const accessTokenObj = JSON.parse(
      window.localStorage.getItem("accessToken")
    );
    expect(accessTokenObj).to.have.property(
      "accessToken",
      response.body.accessToken
    );
  });
});

Cypress.Commands.add("showAddCategoryModal", () => {
  cy.apiLogin("admin", "PasswordAdmin1!");
  cy.visitCreatePage();
  cy.get(".create-secondary-button").click();
});

Cypress.Commands.add("enterCategoryInfo", (categoryName, imageUrl) => {
  cy.showAddCategoryModal();
  cy.get("#formCategoryName").type(categoryName);
  cy.get("#formCategoryImage").type(imageUrl);
});

Cypress.Commands.add("addItem", (cardName, cardImageUrl) => {
  cy.get("#formCardName").clear().type(cardName);
  cy.get("#formCardImage").clear().type(cardImageUrl);
  cy.get(".form-inputs > .btn").click();
});

Cypress.Commands.add("forceOpenItemModal", () => {
  cy.get(".create-primary-button").first().click({ force: true });
});

Cypress.Commands.add("cleanUp", (url) => {
  const localStorageObj = JSON.parse(
    window.localStorage.getItem("accessToken")
  );
  const accessToken = localStorageObj.accessToken;
  cy.request({
    url: url,
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((response) => {
    expect(response).to.have.property("status", 200);
  });
});

Cypress.Commands.add(
  "makePost",
  (url, obj, requiredEnvironmentVariableName) => {
    const localStorageObj = JSON.parse(
      window.localStorage.getItem("accessToken")
    );
    const accessToken = localStorageObj.accessToken;
    cy.request({
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(obj),
    }).then((response) => {
      expect(response).to.have.property("status", 201);
      Cypress.env(requiredEnvironmentVariableName, response.body);
    });
  }
);

Cypress.Commands.add("apiRegister", (username, password) => {
  cy.request("POST", "https://localhost:7259/register", {
    email: username,
    password: password,
  }).then((response) => {
    expect(response).to.have.property("status", 200);
  });
});

Cypress.Commands.add("apiLogout", () => {
  const localStorageObj = JSON.parse(
    window.localStorage.getItem("accessToken")
  );
  const accessToken = localStorageObj.accessToken;
  cy.request({
    url: "https://localhost:7259/logout",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({}),
  }).then((response) => {
    expect(response).to.have.property("status", 200);
    if (response.status === 200) {
      cy.clearLocalStorage();
    }
  });
});
