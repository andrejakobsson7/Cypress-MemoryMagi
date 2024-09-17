Feature: Profile Change password

    Scenario: Profile change password
        Given I am logged in
        When I click the profile icon
        And I enter the current password "PasswordAdmin1!" and the new password "PasswordAdmin2!"
        And I should see a message popup "Password updated successfully." when I click ändra lössenord
   
