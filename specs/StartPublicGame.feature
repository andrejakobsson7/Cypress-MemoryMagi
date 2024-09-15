Feature: Start a public game

    Background: Login as admin
    Given that I am on the Landingpage
    When I write "Admin" in the input with placeholder "Användarnamn"
    And I write "PasswordAdmin1!" in the input with placeholder "Lösenord"
    And I press the button containing "Logga in"
    Then the url should contain "http://localhost:3000/home"

    Scenario: Starting public game
    Given that I can see a category called "Frukt"
    When I press the button containing "Välj spel" 
    And I click the text in the dropdownlist containg "Lätt - Goda frukter"
    And I press the button containing "Starta spel"
    Then the url should contain "http://localhost:3000/Game"
