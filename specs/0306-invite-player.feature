Feature: Invite players

Background:
Given that I am logged in
And standing on the create page

Scenario: See link to invite other players
Given I have selected game type "private"
Then I should see a button to invite other players

Scenario: See other players to invite to game
Given that there exists another user
And I have selected game type "private"
When I open the invite-players modal
Then I should see the newly registered user

Scenario: Invite other players to game
Given that there exists another user
And I have selected game type "private"
And I have opened the invite-players modal
When I click on the newly registered user
And I click on save users-button
Then I should see the list of invited users

Scenario: Not see link to invite other players
And I have selected game type "public"
Then I should not see a button to invite other players

Scenario: Change game type after inviting users
Given that there exists another user
And I have selected game type "private"
And I have invited one other player
When I select game type "public"
Then I should not see information about nr of invited users