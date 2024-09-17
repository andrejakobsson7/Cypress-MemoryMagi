Feature: Preview category information

Background:
Given that I am logged in
And standing on the create page
And I have opened the add category-modal

Scenario: Show preview information
When I type "Hogwarts" in the category name field
And I type "https://cdn.pixabay.com/photo/2023/05/17/19/34/hogwarts-8000905_1280.png" in the image-url field
Then I should see a preview containing "Hogwarts" and the image src should be "https://cdn.pixabay.com/photo/2023/05/17/19/34/hogwarts-8000905_1280.png"

Scenario: Update preview information
Given that I have already typed in category name field and image-url field
When I clear the category name field
And I type "Harry Potter" in the category name field
And I clear the image-url field
And I type "https://cdn.pixabay.com/photo/2019/03/24/12/19/harry-potter-4077473_1280.png" in the image-url field
Then I should see a preview containing "Harry Potter" and the image src should be "https://cdn.pixabay.com/photo/2019/03/24/12/19/harry-potter-4077473_1280.png"
