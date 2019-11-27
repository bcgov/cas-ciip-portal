@mvp
Feature: Authentication

  As an industry reporter
  I want to be able to identify myself to the CIIP application portal
  So that I can access business confidential information

  Background:
    Given the following industry reporter:
      | Name        | Email                   | Username | Password |
      | Dwayne Diaz | dwayne.diaz@example.com | dwayne   | friend   |

  Scenario: navigate to keycloak login
    Given I am not logged in
    And I visit the "Home" page
    When I click the "Login" button
    Then I should be on the "Keycloack Login" page

  Scenario: navigate to dashboard
    Given I am logged in as "Dwayne Diaz"
    And I visit the "Home" page
    When I click the "Login" button
    Then I should be on the "Dashboard" page

  Scenario: successful login with valid username and password
    Given I am not logged in
    And I visit the "Keycloack Login" page
    When I fill out the form as follows:
      | Username or email | Password |
      | dwayne            | friend   |
    And I click the "Log In" button
    Then I should be on the "Dashboard" page

  Scenario: unsuccessful login with invalid username and password
    Given I am not logged in
    And I visit the "Keycloack Login" page
    When I fill out the form as follows:
      | Username or email | Password |
      | dwayne            | frenemy  |
    And I click the "Log In" button
    Then I should be on the "Keycloack Login" page
    And I should see a flash message that says "Invalid username or password."

  Scenario: request password reset by email
    Given I am not logged in
    And I visit the "Keycloack Login" page
    When I click the "Forgot Password?" link
    And I fill out the form as follows:
      | Username or email |
      | dwayne            |
    And I click the "Submit" button
    Then I should be on the "Keycloack Login" page
    And I should see a flash message that says "You should receive an email shortly with further instructions."

  Scenario: reset password via valid reset link
  Scenario: cannot reset password via expired reset link
  Scenario: cannot reset password via used reset link

  Scenario: logout username and password session
    Given I am logged in as "Dwayne Diaz"
    And I visit the "User Dashboard" page
    When I click the "Logout" button
    Then I should be on the "Home" page
    And I should not be logged in
