Feature: Save game
 
Background:
Given that I am logged in
And standing on the create page

Scenario: Save empty game
When I click the button to create game
Then I should get an error message about missing game name

Scenario: Save game without game type
Given that I have already typed in game name-field
When I click the button to create game
Then I should get an error message about missing game type

Scenario: Save game without category
Given that I have already typed in game name-field
And I have selected a game type
When I click the button to create game
Then I should get an error message about missing category

Scenario: Save game without difficulty level
Given that I have already typed in game name-field
And I have selected a game type
And I have selected a category
When I click the button to create game
Then I should get an error message about missing difficulty level

Scenario: Save game without items
Given that I have already typed in game name-field
And I have selected a game type
And I have selected a category
And I have selected difficulty level "Lätt"
When I click the button to create game
Then I should get an error message about missing items

Scenario: Save game with to few cards
Given that I have already typed in game name-field
And I have selected a game type
And I have selected a category
And I have selected difficulty level "Lätt"
And I have opened the add item-modal
And that I have already saved an item
When I click the button to create game
Then I should get an error message about wrong number of items for selected difficulty level

Scenario: Save game with too many cards
Given that I have already typed in game name-field
And I have selected a game type
And I have selected a category
And I have selected difficulty level "Lätt"
And I have opened the add item-modal
And I have added five items
When I click the button to create game
Then I should get an error message about wrong number of items for selected difficulty level

Scenario: Save complete game
Given that I have already typed in game name-field
And I have selected a game type
And I have selected a category
And I have selected difficulty level "Lätt"
And I have opened the add item-modal
And I have added four items
When I click the button to create game
Then I should get a confirmation about successfully added game