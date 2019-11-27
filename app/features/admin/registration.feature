Feature: Registration

  As an incentive admininistrator
  I want to be able to be onboarded using my IDIR
  So that I can administer the CIIP application system

  Background:
    Given the following incentive administrator:
      | Name      | Email                 | Username | Password |
      | Sue Dixon | sue.dixon@example.com | sued99   | mariners |

  # to be scheduled after MVP
  Scenario: request membership in the system admin whitelist

  @mvp
  Scenario: invalid session redirects to login page
    Given I am not logged in
    When I visit the admin page
    Then I should be on the "Login" page

  @mvp
  Scenario: import user data from valid session after login
    Given I am not logged in
    When I log in as "Sue Dixon" for the first time
    Then I should be on the "Registration" page
    And I should see a flash message that says "Please verify or update your information"
    And the filled fields should show:
      | Name      | Email                 | Username |
      | Sue Dixon | sue.dixon@example.com | sued99   |
    And the empty fields should be:
      | Phone Number | Occupation |
    And I should see a "Register" button
    But the filled fields should not be disabled
    And the empty fields should not be disabled

  # to be scheduled after MVP
  Scenario: re-import user data from valid session after login when session attributes have changed

  @mvp
  Scenario: registration page allows the user to edit their details within the portal
    Given I logged in as "Sue Dixon"
    When I visit the "Registration" page
    And I fill the fields as follows:
      | Name        | Email                  | Username   | Phone Number | Occupation               |
      | Susan Dixon | sue.dixon2@example.com | raifwaller | 212-555-9999 | Government Administrator |
    And I click "Register"
    Then I am on the "User Dashboard" page
