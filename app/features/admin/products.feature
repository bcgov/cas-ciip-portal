Feature: Products

  As an incentive admininistrator
  I want to be able to modify products without redeploying the application
  So that I can administer the CIIP application system

  Background:
    Given an incentive administrator named "Sue Dixon"
    And an incentive administrator named "Richard Gardner"
    And "twenty" random products in the list

  @mvp
  Scenario: navigate to create products
    Given I am logged in as "Sue Dixon"
    And I am on the "Manage Products" page
    When I click the "Create a new Product" button
    Then I should be on the "Create Product" page

  @mvp
  Scenario: create products
    Given I am logged in as "Sue Dixon"
    And I am on the "Create Product" page
    When I fill out the form with the following values:
      | Name        | Units      | Benchmark | Eligibility Threshold | Status |
      | Dehydration | Kiloliters | 1020      | 1200                  | Active |
    And I click the "Create Product" button
    Then I should be on the "Manage Products" page
    And the first product in the product list should be highlighted
    And the first product in the product list should have the following values:
      | Name        | Units      | Benchmark | Eligibility Threshold | Status                     |
      | Dehydration | Kiloliters | 1020      | 1200                  | Pending Secondary Approval |
    But I should not see an "Approve" button
    And I should not see an "Reject" button
    And I should not see a flash message

  Scenario: search products
    Given I am logged in as "Sue Dixon"
    And I am on the "Manage Products" page
    And "Richard Gardner" has created a product with the following values:
      | Name          | Units      | Benchmark | Eligibility Threshold | Status |
      | Stabilization | Kiloliters | 4000      | 20000                 | Active |
    When I search for "Stabilization"
    Then the first product in the product list should have the following values:
      | Name          | Units      | Benchmark | Eligibility Threshold | Status |
      | Stabilization | Kiloliters | 4000      | 20000                 | Active |

  Scenario: approve products
    Given I am logged in as "Richard Gardner"
    And I am on the "Manage Products" page
    And "Sue Dixon" has created a product with the following values:
      | Name        | Units      | Benchmark | Eligibility Threshold | Status |
      | Dehydration | Kiloliters | 1020      | 1200                  | Active |
    And I can see the first product in the product list is highlighted
    And I can see the first product in the product list has the following values:
      | Name        | Units      | Benchmark | Eligibility Threshold | Status                     |
      | Dehydration | Kiloliters | 1020      | 1200                  | Pending Secondary Approval |
    When I click the "Approve" button
    Then I should be on the "Manage Products" page
    And I should see a flash message that says "Dehydration added to the list of active products"
    When I search for "Dehydration"
    Then the first product in the product list should have the following values:
      | Name        | Units      | Benchmark | Eligibility Threshold | Status |
      | Dehydration | Kiloliters | 1020      | 1200                  | Active |
    And I should see "one" product in the product list
    And I should see an "Edit" button
    But the first product in the product list should not be highlighted
    And I should not see an "Approve" button
    And I should not see an "Reject" button

  Scenario: replace products
    Given I am logged in as "Sue Dixon"
    And I am on the "Create Product" page
    And "Richard Gardner" has created a product with the following values:
      | Name               | Units  | Benchmark | Eligibility Threshold | Status |
      | Clinker Production | Tonnes | 3156      | 5000                  | Active |
    When I search for "Dehydration"
    And I click the "Edit" button
    And I fill out the form with the following values:
      | Name               | Units  | Benchmark | Eligibility Threshold | Status | Message                                            |
      | Clinker Production | Tonnes | 4000      | 5000                  | Active | Benchmark should be raised due to results of study |
    Then I should be on the "Manage Products" page
    And the first product in the product list should be highlighted
    And the first product in the product list should have the following values:
      | Name               | Units  | Benchmark | Eligibility Threshold | Status                     |
      | Clinker Production | Tonnes | 4000      | 5000                  | Pending Secondary Approval |
    But I should not see an "Approve" button
    And I should not see an "Reject" button
    And I should not see a flash message

  Scenario: deprecate products
    Given I am logged in as "Sue Dixon"
    And I am on the "Create Product" page
    And "Richard Gardner" has created a product with the following values:
      | Name            | Units       | Benchmark | Eligibility Threshold | Status |
      | Inlet Streaming | Centiliters | 400       | 450                   | Active |
    When I search for "Dehydration"
    And I click the "Edit" button
    And I fill out the form with the following values:
      | Name            | Units       | Benchmark | Eligibility Threshold | Status     | Message                                                     |
      | Inlet Streaming | Centiliters | 400       | 450                   | Deprecated | Inlet streaming will no longer be eligible for CIIP in 2265 |
    Then I should be on the "Manage Products" page
    And the first product in the product list should be highlighted
    And the first product in the product list should have the following values:
      | Name            | Units       | Benchmark | Eligibility Threshold | Status                     |
      | Inlet Streaming | Centiliters | 400       | 450                   | Pending Secondary Approval |
    But I should not see an "Approve" button
    And I should not see an "Reject" button
    And I should not see a flash message

  Scenario: retire products
    Given I am logged in as "Sue Dixon"
    And I am on the "Create Product" page
    And "Richard Gardner" has created a product with the following values:
      | Name            | Units       | Benchmark | Eligibility Threshold | Status |
      | Inlet Streaming | Centiliters | 400       | 450                   | Active |
    When I search for "Dehydration"
    And I click the "Edit" button
    And I fill out the form with the following values:
      | Name            | Units       | Benchmark | Eligibility Threshold | Status  | Message                                    |
      | Inlet Streaming | Centiliters | 400       | 450                   | Retired | Bill told me it's already 2265 in his mind |
    Then I should be on the "Manage Products" page
    And the first product in the product list should be highlighted
    And the first product in the product list should have the following values:
      | Name            | Units       | Benchmark | Eligibility Threshold | Status                     |
      | Inlet Streaming | Centiliters | 400       | 450                   | Pending Secondary Approval |
    But I should not see an "Approve" button
    And I should not see an "Reject" button
    And I should not see a flash message
