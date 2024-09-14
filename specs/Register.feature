
Feature: Register user

    Scenario: Register a user
        Given that I am on the landingpage
        And I click Skapa konto on the page
        When I enter "NewUser20" and "newUser@memorytest.se" and "Password12345!" into my input fields
        When I click on Registrera i will get "Ditt kontot har blivit skapat"

