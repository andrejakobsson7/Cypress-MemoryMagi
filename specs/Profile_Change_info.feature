Feature: Profile Change info

    Scenario: Profile change info
        Given I am logged in
        When I click the profile icon
        And I change the email to "admin@magicmagitest.com"
        Then I should see a message "Profile updated successfully." when i click the ändra profil detaljer button
