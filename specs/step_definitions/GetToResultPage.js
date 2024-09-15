import '../step_definitions/StartPublicGame'

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Then('{int} cards should be displayed', (cardCount) => {
  cy.get('.card-game').should('have.length', cardCount);
});


When('I click a card', () => {
  cy.get('.card-game').first().click();
});

Then('the the card should be flipped', () => {
  cy.get('.card-game').first().should('have.class', 'cardFlip-game');
});


When('two cards that match are flipped', () => {
  cy.get('.card-game').eq(0).click();
  cy.get('.card-game').eq(1).click();
});

Then('matching cards should be removed from the page', () => {
  cy.wait(1000);
  cy.get('.card-game').should('have.length', 10);
});

When('all of the cards are matched', () => {
  function matchCards() {
    cy.get('body').then(($body) => {
      const unmatchedCards = $body.find('.card-game').not('.cardFlip-game');

      if (unmatchedCards.length === 0) {
        cy.url().should('include', '/Result');
        return;
      }

      cy.wrap(unmatchedCards[0]).click().find('.back-game img')
        .invoke('attr', 'src')
        .then((firstCardImage) => {
          cy.get('.card-game').not('.cardFlip-game').filter((_, card) => {
            return Cypress.$(card).find('.back-game img').attr('src') === firstCardImage;
          }).first().click();
        });

      cy.wait(1500).then(matchCards);
    });
  }

  matchCards();
});










