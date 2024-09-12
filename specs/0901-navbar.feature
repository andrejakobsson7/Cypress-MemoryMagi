Feature: Navbar

Scenario: Unauthorized user should only see home link
Given standing on the landing page
Then I should only see link to Home

Scenario: Authorized user should se all links
Given that I am logged in
And standing on the landing page
Then I should see all links 

Scenario: Current page should be highlighted
Given that I am logged in
Given standing on the home page
Then link to Home should look different compared to other links