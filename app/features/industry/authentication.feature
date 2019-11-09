@mvp
Feature: Authentication

  As an industry user
  I want to be able to identify myself to the CIIP application portal
  So that I can access business confidential information

  Scenario: successful login with valid username and password
  Scenario: unsuccessful login with invalid username and password
  Scenario: request password reset by email
  Scenario: reset password via valid reset link
  Scenario: cannot reset password via expired reset link
  Scenario: cannot reset password via used reset link
  Scenario: logout username and password session
