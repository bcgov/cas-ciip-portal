@mvp
Feature: Authentication

  As an incentive analyst
  I want to be able to identify myself using my IDIR
  So that I can analyze CIIP applications

  Background:
    Given the following incentive analyst:
      | Name           | Email                      | Username | Password |
      | Raymond Curtis | raymond.curtis@example.com | rcurt51  | japan    |

  Scenario: successful login with valid IDIR
    Given I am not logged in
    And I am on the "Home" page
    When I click the "Login" button
    And I click the "IDIR" button
    And I fill the fields as follows:
      | IDIR Username | Password |
      | rcurt51       | japan    |
    And I click "Continue"
    Then I should be on the "User Dashboard" page

  Scenario: unsuccessful login with invalid IDIR
    Given I am not logged in
    And I am on the "Home" page
    When I click the "Login" button
    And I click the "IDIR" button
    And I fill the fields as follows:
      | IDIR Username | Password |
      | rcurt51       | americatruckyeah    |
    And I click "Continue"
    Then I should be on the "Log in with IDIR" page
    And I should see a flash message that says "The username or password you entered is incorrect"
