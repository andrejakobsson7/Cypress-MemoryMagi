Feature: Save category 

Background:
Given that I am logged in
And standing on the create page
And I have opened the add category-modal

Scenario: Save complete category
Given that I have already typed in category name field and image-url field
When I click the save category-button
Then I should see "Hogwarts" in the list of available categories

Scenario: Save category missing name
Given that I have already typed in category name field and image-url field
When I clear the category name field
And I click the save category-button
Then I should see an error message

Scenario: Save category missing image
Given that I have already typed in category name field and image-url field
When I clear the image-url field
And I click the save category-button
Then I should see an error message