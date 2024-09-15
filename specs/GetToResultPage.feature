Feature: Getting to the resultpage

    Scenario: Login as admin
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

    Scenario: All cards are displayed
        Given the url should contain "http://localhost:3000/Game"
        Then 12 cards should be displayed

    Scenario: Flipping a card
        Given the url should contain "http://localhost:3000/Game"
        When I click a card
        Then the the card should be flipped

    Scenario: Making two cards match
        Given the url should contain "http://localhost:3000/Game"
        When two cards that match are flipped
        Then matching cards should be removed from the page

    Scenario: Matching all cards and winning the game which should redirect to the result page
        Given the url should contain "http://localhost:3000/Game"
        When all of the cards are matched
        Then the url should contain "http://localhost:3000/Result"


