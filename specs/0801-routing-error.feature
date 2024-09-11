Feature: Try to go to Authorized page

Scenario: Try to go an authorized page
        Given that I am on the landing and try to enter wrong 
        And I try to change my url to "http://localhost:3007/home"
        When the routes fail 
        Then I will not be able to see the games