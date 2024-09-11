Feature: Start game and choose difficulty
Background:
Given that I am logged 
And standing on home page

Scenario: Time to play a game and choose difficulty
        
        And When i choose to play a public game
        And before I try to start the game I choose a difficulty
        When I click on Start game
        Then the game will start