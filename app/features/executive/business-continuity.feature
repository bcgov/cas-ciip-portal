@mvp
Feature: Business Continuity

  As an executive
  I want the CIIP portal and all citizen data to be recoverable in case of disaster
  So that the service design is designed effectively

  Scenario: nightly database backup to the enterprise backup service
  Scenario: nightly database backup to an object storage bucket
  Scenario: nightly database backup to an approved offsite facility
  Scenario: hard runbook for catastrophic systems failure
  Scenario: monthly restore to a test openshift namespace
  Scenario: robust schema for data that will outlive the CIIP Portal
