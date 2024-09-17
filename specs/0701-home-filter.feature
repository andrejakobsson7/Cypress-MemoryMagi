Feature: Filter on private and public games in home page

Background:
Given that first user has created one public game and one private game

Scenario: First user filters on public games
Given that I am signed in as first user
And standing on the home page
When I click the button to filter on public games
Then I should see the public game that first user created

Scenario: First user filters on private games
Given that I am signed in as first user
And standing on the home page
When I click the button to filter on private games
Then I should see the private game that first user created

Scenario: Second user filters on public games
Given that I have just registered as new user
And I have logged in as new user
When I am standing on the home page
When I click the button to filter on public games
Then I should see the public game that first user created

Scenario: Second user filters on private games
And I have logged in as new user
When I am standing on the home page
And I click the button to filter on private games
Then I should not see the private game that first user created

Scenario: Second user filters on private games after being invited to private game by first user
Given that first user has created a new private game and invited second user to it
When the second user filters on private games
Then I should see the game that I have been invited to
