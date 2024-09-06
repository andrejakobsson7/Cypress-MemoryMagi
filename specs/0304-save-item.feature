Feature: Save item 

Background:
Given that I am logged in
And standing on the create page
And I have opened the add item-modal

Scenario: Save complete item
Given that I have already typed in "Ron Weasley" in the item name field and "https://cdn.pixabay.com/photo/2012/04/12/11/53/harry-potter-29680_1280.png" in the image-url field
When I click the save item-button
Then I should see image with src "https://cdn.pixabay.com/photo/2012/04/12/11/53/harry-potter-29680_1280.png" in the list of added items

Scenario: Save item missing name
Given that I have already typed in "Ron Weasley" in the item name field and "https://cdn.pixabay.com/photo/2012/04/12/11/53/harry-potter-29680_1280.png" in the image-url field
When I clear the item name field
And I click the save item-button
Then I should get a item validation error regarding name

Scenario: Save item missing image
Given that I have already typed in "Ron Weasley" in the item name field and "https://cdn.pixabay.com/photo/2012/04/12/11/53/harry-potter-29680_1280.png" in the image-url field
When I clear the item image-url field
And I click the save item-button
Then I should get a item validation error regarding image

Scenario: Save multiple items
Given that I have already saved an item
When I save another one
Then I should see both items in the list of added items


