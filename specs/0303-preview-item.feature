Feature: Preview item information

Background:
Given that I am logged in
And standing on the create page
And I have opened the add item-modal

Scenario: Show preview information
When I type "Ron Weasley" in the item name field
And I type "https://cdn.pixabay.com/photo/2012/04/12/11/53/harry-potter-29680_1280.png" in the item image-url field
Then I should see a preview containing "Ron Weasley" and the item image src should be "https://cdn.pixabay.com/photo/2012/04/12/11/53/harry-potter-29680_1280.png"

Scenario: Update preview information
Given that I have already typed in "Ron Weasley" in the item name field and "https://cdn.pixabay.com/photo/2012/04/12/11/53/harry-potter-29680_1280.png" in the image-url field
When I clear the item name field
And I type "Harry Potter" in the item name field
And I clear the item image-url field
And I type "https://cdn.pixabay.com/photo/2019/03/24/12/19/harry-potter-4077473_1280.png" in the item image-url field
Then I should see a preview containing "Harry Potter" and the item image src should be "https://cdn.pixabay.com/photo/2019/03/24/12/19/harry-potter-4077473_1280.png"