Feature: Visit pages

    Scenario: Visit FAQ
        Given I am on landingpage
        When I click on FAQ
        Then I should be on FAQ page

    Scenario: Visit OmOss
        Given I am on landingpage
        When I click on OmOss
        Then I should be on OmOss page