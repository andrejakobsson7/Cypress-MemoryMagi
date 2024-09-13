Feature: Play private game

    Scenario: Play private game
        Given I am logged in as Admin
        When I click the private button
        And I start a private game
        Then I should see game starting
