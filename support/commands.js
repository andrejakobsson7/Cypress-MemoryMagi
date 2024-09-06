//Help methods that can be used in test cases where applicable

const baseUrl = require("../baseUrl");

Cypress.Commands.add("visitCreatePage", () => {
  cy.visit("/create");
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
  cy.get(".btn-secondary").click();
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
  cy.get(".button-group > .btn-primary").click({ force: true });
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
